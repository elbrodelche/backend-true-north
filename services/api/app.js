//Include api modules.
const http       = require('http');
const express    = require('express');
const bodyParser = require('body-parser');
const yaml = require('js-yaml');
const fs = require('fs');

//Include custom modules.
const api    = require('./helper.js');
const routes = require('./routes/routes.js');

// Get the config
let config = {};
try {
	config = yaml.safeLoad(fs.readFileSync('./config/api.yml', 'utf8'));
} catch (e) {
	console.log(e);
}

//Start Express-js
const app    = express();
const server = http.createServer(app);

//Add bodyparser and CORS.
app.use(bodyParser.json());
app.use(api.CORS);
app.use(bodyParser.urlencoded({ extended: true }));

//Include routings.
app.use('/user/',routes.user);
app.use('/restaurant/',routes.restaurant);
app.use('/order/',routes.order);

//Get ip / port.
let {ip,port} = config;

//Start listen mode.
app.listen(port,ip,api.Server.onListen);

//Handle process exit.
process.on('SIGTERM', api.Server.onClose);
process.on('SIGINT',  api.Server.onClose);
process.on('uncaughtException', api.Server.onError);