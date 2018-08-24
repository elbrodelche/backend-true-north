//Express.JS router
const express = require('express');
const router  = express.Router();

//Include models.
const models    = require('../models/models.js');

//Include logger.
const logger    = require('../../../lib/logger.js');

//Include custom modules.
const Api       = require('../helper.js');

//Calculate restaurant rate.
const calculateRate = async (restaurantId)=>{

  try{

    //Get all the rates.
    let rates = await models.Review.findAll({raw:true,where: {restaurant_id:restaurantId}});

    if (rates!=null){
      
      let rate = 0;

      //Sum all the rates of the restaurant.    
      rates.forEach((rateTmp) => rate += rateTmp.rating);

      //Calc the rate average.
      return Math.floor(rate/rates.length);

    } else
      return null;

  } catch(error){  
    throw new Error(Api.format.onError('QUERY',error));
  }

}

//New review.
const newReview = async (req)=>{

  try{

    let userId  = req.body.user;
    let storeId = req.params.id;

    logger.info('New restaurant review request.');

    //Get user by id.
    let user  = await models.User.findById(userId);

    //Get store by id.
    let store = await models.Restaurant.findById(storeId);

    //If the ids are valids.
    if ((user!=null)&&(store!=null)){

      //Create new rate.
      await models.Review.create({
        name   : req.body.name,
        review : req.body.review,
        rating : req.body.rating,
        restaurant_id : storeId,
        user_id : userId
      });

      //Calculate the new rate.
      let rate = await calculateRate(storeId);

      if (rate!=null){

        //Update the restaunt rate.
        await models.Restaurant.update({rating:rate},{where:{id:storeId}});

        return {
          restaurant:{            
            id      : storeId,
            rating  : rate,
            success : true
          }
        };

      } else
        return Api.format.onError('INTERNALERROR')

    } else
        return Api.format.onError('BADREQUEST');

  } catch(error){    
    throw new Error(Api.format.onError('QUERY',error));
  }

}

//Get all the restaurants.
const getAll = async ()=>{

  try {

    logger.info('Get all restaurants request');

    //Joined models.
    let joins = {include:[
      {model: models.Review},
      {model: models.Meal}]
    };

    //Get all the elements.
    let stores = await models.Restaurant.findAll(joins);

    //Return and parse the result.
    return stores.map((store) => store.dataValues);

  }catch(error){
    console.log(error);
    throw new Error(Api.format.onError('QUERY',error));
  }

}

//Filter by rating
const getByRate = async (ratingValue)=>{

  try {

    logger.info('Get all restaurants by rating request');

    //Joined models.
    let joins = [
      {model: models.Review},
      {model: models.Meal}
    ];

    //Get all the elements.
    let restaurants = await models.Restaurant.findAll({include:joins,where: {rating:ratingValue}});

    //Return and parse the result.
    return restaurants.map((rest) => rest.dataValues);

  }catch(error){
    throw new Error(Api.format.onError('QUERY',error));
  }

}

//Filter by id.
const get = async (req)=>{

  try {

    logger.info('Get restaurant by ID request');

    //Joined models.
    let joins = [
      {model: models.Review},
      {model: models.Meal}
    ];

    //Get all the elements.
    let restaurant = await models.Restaurant.find({include:joins,where:{id:req.params.id}});

    return restaurant;

  }catch(error){
    throw new Error(Api.format.onError('QUERY',error));
  }

}

//Delete restaurant.
const deleteRestaurant = async (idDelete)=>{

  try {

    logger.info('Delete restaurant by ID request');

    let result = await models.Restaurant.destroy({where: {id:idDelete}});

    return ((result>0)?{"id":idDelete,"success":true}:{"id":idDelete,"no-result":true});

  }catch(error){
    throw new Error(Api.format.onError('QUERY',error));
  }

}

//Update restaurant.
const updateStore = async (req)=>{

  try {

    logger.info('Update restaurant request');

    let storeId = req.params.id;

    //Get store by id.
    let store = await models.Restaurant.findById(storeId);
    
    if (store!=null){

      //Update the restaunt rate.
      let result = await models.Restaurant.update({
        commercialName  : req.body.commercialName,
        legalName       : req.body.legalName,
        commercialEmail : req.body.commercialEmail,
        adminNumber     : req.body.adminNumber,
        address         : req.body.address,
        latitude        : req.body.latitude,
        longitude       : req.body.longitude,
        rating          : req.body.rating        
      },{
        where:{
          id:storeId
        }
      });

      return ((result>0)?{"id":storeId,"success":true}:{"id":storeId,"no-result":true});;

    } else 
        return Api.format.onError('NOTFOUND');


  }catch(error){
    throw new Error(Api.format.onError('QUERY',error));
  }

}

module.exports.updateStore      = updateStore;
module.exports.deleteRestaurant = deleteRestaurant;
module.exports.getByRate        = getByRate;
module.exports.getAll           = getAll;
module.exports.get              = get;
module.exports.newReview        = newReview;
module.exports.calculateRate    = calculateRate;
