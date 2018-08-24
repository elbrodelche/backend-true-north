//Validate class.
class Validator{

  id(req){

    return (req.params.id!=null);

  }

  order(req){

    return (req.params.storeid!=null);

  }

  rate(req){

    return ((req.params.id    !=null)&&
            (req.body.name    !=null)&&
            (req.body.review  !=null)&&
            (req.body.rating  !=null)&&
            (req.body.user    !=null));

  }

  rateFilter(req){

    return (req.params.value!=null);

  }

  updateStore(req){

    return ((req.params.id            !=null)&&
            (req.body.commercialName  !=null)&&
            (req.body.legalName       !=null)&&
            (req.body.commercialEmail !=null)&&
            (req.body.adminNumber     !=null)&&
            (req.body.address         !=null)&&
            (req.body.latitude        !=null)&&    
            (req.body.longitude       !=null)&&                 
            (req.body.rating          !=null))  ;

  }

}

module.exports = new Validator();