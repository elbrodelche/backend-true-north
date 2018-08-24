//Include resource routes.
const userRoutes       = require('./user.js');
const restaurantRoutes = require('./restaurant.js');
const orderRoutes 	   = require('./order.js');

module.exports = {
  user       : userRoutes,
  restaurant : restaurantRoutes,
  order 	 : orderRoutes
};