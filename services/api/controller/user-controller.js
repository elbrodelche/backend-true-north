//Express.JS router
const express = require('express');
const router  = express.Router();

//Include models.
const Models  = require('../models/models.js');
const Api     = require('../helper.js');

//Include logger
const logger  = require('../../../lib/logger.js');

//Get all the users.
const getAll = async ()=>{

  try {

    logger.info('Get all users request');

    //Get all the elements.
    let users = await Models.User.findAll();

    //Return and parse the result.
    return users.map((user) => user.dataValues);

  }catch(error){
    throw new Error(Api.format.onError('QUERY',error));
  }

}

module.exports.getAll = getAll;