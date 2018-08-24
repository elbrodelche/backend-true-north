const env      = process.env.NODE_ENV || 'development';
const winston  = require('winston');
const fs       = require('fs');
const yaml = require('js-yaml');

//Load config file.
let config = {};
try {
	config = yaml.safeLoad(fs.readFileSync('./config/main.yml', 'utf8'));
} catch (e) {
	console.log('Cant load config file: ' + e);
}

//Timestamp Echo.
const timeStampFormat= ()=>{
  return (new Date()).toLocaleTimeString();
}

//Define Log - console.
const wConsole = new (winston.transports.Console)({
  timestamp : timeStampFormat,
  colorize  : true,
});

//Define Log - file.
const wFile = new (winston.transports.File)({
  filename    : config.log_path,
  timestamp   : timeStampFormat,
  datePattern : 'yyyy-MM-dd',
  prepend     : true,
  level       : env === 'development' ? 'debug' : 'info'
});

//Create winston and transports layers.
module.exports = winston.createLogger({transports: [wConsole,wFile]});