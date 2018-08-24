//Load the sequelize & connector.
const Sequelize = require("sequelize");
const ORM       = require('./connector.js');

//USER model.
const User = ORM.define('user',{
  firstName : Sequelize.STRING,
  lastName  : Sequelize.STRING,
  phone     : Sequelize.STRING,
  email     : Sequelize.STRING
});

//RESTAURANT model.
const Restaurant = ORM.define('restaurant',{
  logo            : Sequelize.STRING,
  commercialName  : Sequelize.STRING,
  legalName       : Sequelize.STRING,
  commercialEmail : Sequelize.STRING,
  adminNumber     : Sequelize.STRING,
  address         : Sequelize.STRING,
  latitude        : Sequelize.FLOAT,
  longitude       : Sequelize.FLOAT,
  rating          : Sequelize.INTEGER
});

//REVIEW model.
const Review = ORM.define('review',{
  name          : Sequelize.STRING,
  review        : Sequelize.STRING,
  rating        : Sequelize.INTEGER,
  restaurant_id : Sequelize.INTEGER,
  user_id       : Sequelize.INTEGER
});

//Define relation between the restaurants and his reviews.
Restaurant.hasMany(Review, {
  foreignKey  : 'restaurant_id',
  constraints : false,
});

Review.belongsTo(Restaurant, {
  foreignKey  : 'restaurant_id',
  constraints : false,
  as          : 'restaurant'
});

//Reation between the rates and the user how made it.
Review.belongsTo(User, {
  foreignKey  : 'user_id',
  constraints : false,
  as          : 'user'
});

//Meal model.
const Meal = ORM.define('meal',{
  name          : Sequelize.STRING,
  description   : Sequelize.STRING,
  price         : Sequelize.FLOAT,
  restaurant_id : Sequelize.INTEGER
});

Restaurant.hasMany(Meal, {
  foreignKey  : 'restaurant_id',
  constraints : false
});

Meal.belongsTo(Restaurant, {
  foreignKey  : 'restaurant_id',
  constraints : false,
  as          : 'restaurant'
});

//Define Order model.
const Order = ORM.define('order',{
  address       : Sequelize.STRING,  
  latitude      : Sequelize.FLOAT,
  longitude     : Sequelize.FLOAT,  
  user_id       : Sequelize.INTEGER,
  restaurant_id : Sequelize.INTEGER,
  eta           : Sequelize.STRING,
  cost          : Sequelize.FLOAT
});

//Define relation between an order an his restaurant
Restaurant.hasMany(Order, {
	foreignKey  : 'restaurant_id',
	constraints : false
});

//Define relation between a order and his user.
Order.belongsTo(User, {
  foreignKey  : 'user_id',
  constraints : false,
  as          : 'user'
});

//Define relation between a order and his restaurant.
Order.belongsTo(Restaurant, {
  foreignKey  : 'restaurant_id',
  constraints : false,
  as          : 'restaurant'
});

//Order - meal model.
const OrderMeal = ORM.define('order_meal',{
  order_id : Sequelize.INTEGER,
  name     : Sequelize.STRING,
  price    : Sequelize.INTEGER
});

//Relations with the order.
OrderMeal.belongsTo(Meal, {
  foreignKey  : 'order_id',
  constraints : false,
  as          : 'order'
});

//Relation 1 to many.
Order.hasMany(OrderMeal, {
  foreignKey  : 'order_id',
  constraints : false
});

module.exports.ORM        = ORM;
module.exports.User       = User;
module.exports.Restaurant = Restaurant;
module.exports.Meal       = Meal;
module.exports.Review     = Review;
module.exports.Order      = Order;
module.exports.OrderMeal  = OrderMeal;