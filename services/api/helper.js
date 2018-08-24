const processObj = require('process'); 
const logger     = require('../../lib/logger.js');
const yaml = require('js-yaml');
const fs = require('fs');

// Get the config
let config = {};
try {
	config = yaml.safeLoad(fs.readFileSync('./config/api.yml', 'utf8'));
} catch (e) {
	console.log(e);
}

//Add CORS to middleware.
const cors = (req, res, next)=>{

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // Intercepts OPTIONS method
  if ('OPTIONS' === req.method)      
    res.sendStatus(200);
  else
    next();

}

//Clas to handle process events.
class Server{

  onListen(){

    let {ip,port} = config;

    logger.info('Restaurant API');
    logger.info('Listenig in ip: '+ip+' port:'+port);
    logger.info('Process Id:'+processObj.pid);

  }

  //Before the process die, do something.
  onClose(){

    logger.warn('Closing server PID:'+processObj.pid);
    process.exit();

  }

	//When the server detect a unhandled exception.
  onError(error){

    logger.warn('Error detected...');
    logger.warn('Process Id:'+processObj.pid);
    logger.warn(JSON.stringify(error));

  }

}

//Api response format.
class Format{

  onError(code,stack){

    return {
      "error":{
        "code":code,
        "detail":stack
      }
    };

  }

}

module.exports.CORS     = cors;
module.exports.Server   = new Server();
module.exports.format   = new Format();