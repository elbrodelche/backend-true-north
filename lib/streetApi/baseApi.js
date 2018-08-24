//Include auxiliary classes.
const googleMaps = require('./googleMaps.js');
const point      = require('./point.js');

//Strategy ETA distance - calculator.
class baseApi{

  constructor(provider,pOrigin,pDestiny,key, dTime){

    this.provider = provider;
    this.calculer = null;
    this.origin   = pOrigin;
    this.destiny  = pDestiny;
    this.apiKey   = key;
    this.departure_time = dTime;

  }

  setProviderObj(){

    if (this.provider=='googleMaps')
       this.calculer = new googleMaps(this.apiKey, this.departure_time);
  }

  calc(){
    this.setProviderObj();

    //Calculate the distance.
    return this.calculer.calcDistance(this.origin.strPoint(),this.destiny.strPoint());
    
  }

}

module.exports = baseApi;