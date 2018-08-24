//Express.JS router
const express = require('express');
const router  = express.Router();

//Include models.
const models     = require('../models/models.js');

//Include custom modules.
const Api        = require('../helper.js');
const Validator  = require('./validator.js');
const controller = require('../controller/restaurant-controller.js');

//Delete restaurant.
router.delete('/:id',(req,res)=>{

  //If the parametes are defined.
  if (Validator.id(req)){

    controller.deleteRestaurant(req.params.id)
      .then((result) => res.status(200).json({"restaurant":result}))
      .catch((err)   => res.status(500).json(Api.format.onError('API',err)));

  } else 
    res.status(400).json(Api.format.onError('BADREQUEST',null));

});

//Filter restaurant by rate.
router.get('/rate/:value',(req,res)=>{

  //If the parametes are defined.
  if (Validator.rateFilter(req)){

    controller.getByRate(req.params.value)
      .then((stores) => res.status(200).json({"restaurants":stores}))
      .catch((err)   => res.status(500).json(Api.format.onError('API',err)));

  } else 
    res.status(400).json(Api.format.onError('BADREQUEST',null));

});

//Get restaurant by id.
router.get('/:id',(req,res)=>{

  if (Validator.id(req)){

    controller.get(req)
      .then((store) => res.status(200).json({"restaurant":store}))
      .catch((err)  => res.status(500).json(Api.format.onError('API',err)));

  } else 
    res.status(400).json(Api.format.onError('BADREQUEST',null));

});

//List all the restaurant list.
router.get('/',(req,res)=>{

  controller.getAll()
    .then((stores) => res.status(200).json({"restaurants":stores}))
    .catch((err)   => res.status(500).json(Api.format.onError('API',err)));

});

//Add new review.
router.post('/:id/review',(req,res)=>{

  //If the parametes are defined.
  if (Validator.rate(req)){

    //Find by rate.
    controller.newReview(req)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(Api.format.onError('API',err)));

  } else
    res.status(400).json(Api.format.onError('BADREQUEST',null));

});

//Update basic restaurant info.
router.put('/:id',(req,res)=>{

  //If the parametes are defined.
  if (Validator.updateStore(req)){

    //Find by rate.
    controller.updateStore(req)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(Api.format.onError('API',err)));

  } else
    res.status(400).json(Api.format.onError('BADREQUEST',null));

});

module.exports = router;