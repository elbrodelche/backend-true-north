const chai       = require('chai');
const assert     = require('assert');
const models     = require('../services/api/models/models.js');
const streetApi  = require('../lib/streetApi/baseApi.js');
const geoPoint   = require('../lib/streetApi/point.js');
const yaml       = require('js-yaml');
const fs         = require('fs');

// Get the config
let configApi = {};

describe("Api Rest service - TEST", ()=>{

  //Config test.
  describe("Street Api", ()=>{

    it("Configuration test", (done)=>{

      try {

        configApi = yaml.safeLoad(fs.readFileSync('./config/streetApi.yml', 'utf8'));
        chai.expect(configApi).to.not.equal(null);
        done();

      } catch (e) {
        assert(false);        
        done();
      }

    });

  });

  //Test sequelize models.
  describe("Database test", ()=>{

    //Test db connection 
    it("Connecting", (done)=>{

      models.ORM.authenticate()
        .then((status) =>{
          assert(true);
          done();
        })
        .catch((err) =>{
          assert(false);
          done();            
        });

    }).timeout(5000);

    //Check user model
    it("Model check - USER", (done)=>{

      models.User.findOne()
      .then((user)=>{
        chai.expect(user).to.not.equal(null);
        done();
      })
      .catch((err)=>{
        assert(false);
        done();
      });

    });

    //Check restaurant moodel. 
    it("Model check - RESTAURANT", (done)=>{

      models.Restaurant.findOne()
        .then((store)=>{
          chai.expect(store).to.not.equal(null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

    //Check meal model.
    it("Model check - MEAL", (done)=>{

      models.Meal.findOne()
        .then((meal)=>{
          chai.expect(meal).to.not.equal(null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

    //Check order model create.
    it("Model check - ORDER", (done)=>{

      models.Order.create({
        address   : 'test street', 
        latitude  : 0,
        longitude : 0, 
        user_id   : 1,
        restaurant_id : 1,
        eta : '10 min',
        cost : 100
      })
        .then((add)=>{
          assert(add!=null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

    //Check meal model find.
    it("Model check - ORDER", (done)=>{

      models.Order.findOne()
        .then((meal)=>{
          chai.expect(meal).to.not.equal(null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

    //Check order-meal create.
    it("Model check - ORDER MEAL", (done)=>{

      models.OrderMeal.create({
        order_id : 1, 
        name  : 'test',
        price : 100
      })
        .then((add)=>{
          assert(add!=null);
          done();
        })
        .catch((err)=>{
          assert(false);
          done();
        });

    });

  });

 //Test Google Maps API.
  describe("Street Api", ()=>{

    it("ETA - Distance calculation", (done)=>{

      //Define two differents points
      let start  = new geoPoint(-34.6138573,-58.2149374);
      let end    = new geoPoint(-34.860320,-58.4959011);
      let apiGeo = new streetApi('googleMaps',start,end,configApi.key,9404696787);

      apiGeo.calc()
        .then((eta) =>{
          chai.expect(eta).to.not.equal('');
          done();
        })
        .catch((err) =>{
          assert(false);
          done();            
        });

    }).timeout(5000);

  });

});