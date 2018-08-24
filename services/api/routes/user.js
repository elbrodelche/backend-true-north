//Express.JS router
const express = require('express');
const router  = express.Router();

//Include models.
const Models     = require('../models/models.js');
const Api        = require('../helper.js');
const controller = require('../controller/user-controller.js');

//List all the meals list.
router.get('/',(req,res)=>{

  //Get the list of users.
  controller.getAll()
    .then((users) => res.status(200).json({"users":users}))
    .catch((err)  => res.status(500).json(Api.format.onError('API',err)));

});

module.exports = router;