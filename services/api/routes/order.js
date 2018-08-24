//Express.JS router
const express = require('express');
const router  = express.Router();

//Include models.
const models     = require('../models/models.js');

//Include custom modules.
const Api        = require('../helper.js');
const Validator  = require('./validator.js');
const controller = require('../controller/order-controller.js');


//List all the order list.
router.get('/',(req,res)=>{

  controller.getAll()
    .then((orders) => res.status(200).json({"orders":orders}))
    .catch((err)   => res.status(500).json(Api.format.onError('API',err)));

});

//Add new review.
router.post('/:storeid/',(req,res)=>{

  //If the parametes are defined.
  if (Validator.order(req)){

    //Find by rate.
    controller.newOrder(req)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(Api.format.onError('API',err)));

  } else
    res.status(400).json(Api.format.onError('BADREQUEST',null));

});

module.exports = router;