//Express.JS router
const express = require('express');
const router = express.Router();
const fs = require('fs');
const yaml = require('js-yaml');
const moment = require('moment');

//Include models.
const Models = require('../models/models.js');
const Api = require('../helper.js');
const {shout} = require('../../../lib/rabbit/emitter');

// Get the config file
let config = {};
try {
	config = yaml.safeLoad(fs.readFileSync('./config/streetApi.yml', 'utf8'));
} catch (e) {
	console.log(e);
}

// Point
const StreetApi = require('../../../lib/streetApi/baseApi.js');
const Point = require('../../../lib/streetApi/point.js');

// Include logger
const logger = require('../../../lib/logger.js');

//Get all the users.
const getAll = async () => {

	try {

		logger.info('Get all order request');

		//Get all the elements.
		let orders = await Models.Order.findAll({include: [{model: Models.OrderMeal}]});

		//Return and parse the result.
		return orders.map((order) => order.dataValues);

	} catch (error) {
		throw new Error(Api.format.onError('QUERY', error));
	}

};

//Validate ids.
const validateIds = async (storeId, userId) => {

	//Get user by id.
	let user = await Models.User.findById(userId);

	//Get store by id.
	let store = await Models.Restaurant.findById(storeId);

	return ((user != null) && (store != null));

};

//Sum meal cost.
const calcCost = (meals) => {

	let total = 0;

	meals.forEach((meal) => {
		total += meal.price;
	});

	return total;

};

//Get ETA
const getETA = async (req) => {

	//Get store.
	let store = await Models.Restaurant.findById(req.params.storeid);

	//Position.
	let origin = new Point(req.body.latitude, req.body.longitude);
	let destiny = new Point(store.latitude, store.longitude);

	let eta = '';

	try {

		eta = await new StreetApi('googleMaps', origin, destiny, config.key,moment().utc().valueOf()).calc();

	} catch (err) {
		console.log(err);
	}

	return eta;

};

//Save meals.
const saveMeals = async (req, orderId) => {

	let prom = [];

	req.body.meals.forEach((meal) => {

		prom.push(Models.OrderMeal.create({
			order_id: orderId,
			name: meal.name,
			price: meal.price
		}));

	});

	return Promise.all(prom);

};

//Create new order.
const newOrder = async (req) => {

	try {

		logger.info('New order request');

		let storeId = req.params.storeid;
		let userId = req.body.user_id;

		//Check validate id.
		let valid = validateIds(storeId, userId);

		if (!valid) {
			return Api.format.onError('BADREQUEST');
		} else {

			//Calc the total.
			let total = calcCost(req.body.meals);

			//Get ETA.
			let etaTime = await getETA(req);

			//Create order.
			let newOrder = await Models.Order.create({
				address: req.body.address,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				user_id: req.body.user_id,
				restaurant_id: storeId,
				eta: etaTime,
				cost: total
			});

			//Save meals.
			saveMeals(req, newOrder.id);

			// Emit a message
			shout(JSON.stringify(newOrder));

			return newOrder;

		}

	} catch (error) {
		throw new Error(Api.format.onError('QUERY', error));
	}

};

module.exports.getAll = getAll;
module.exports.newOrder = newOrder;