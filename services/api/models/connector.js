const Sequelize = require("sequelize");
const yaml = require('js-yaml');
const fs = require('fs');

// Get the config
let config = {};
try {
	config = yaml.safeLoad(fs.readFileSync('./config/posgres.yml', 'utf8'));
} catch (e) {
	console.log(e);
}

//Destructuring config json.
const {user,database,pass,host,type,debug} = config;

//Create sequlize orm connection.
const ORM = new Sequelize(database,user,pass,{
  host    : host,
  dialect : type,
  logging : debug,
  operatorsAliases : false
});

module.exports = ORM;