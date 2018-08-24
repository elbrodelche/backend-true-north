const models = require('./models.js');

//Creating schema.
const createSchema = async () => {

	console.log('\n> Creating tables !!\n');

	//Make drop table if exists table, its run only one time.
	await models.User.sync({force: true});
	await models.Restaurant.sync({force: true});
	await models.Review.sync({force: true});
	await models.Meal.sync({force: true});
	await models.Order.sync({force: true});
	await models.OrderMeal.sync({force: true});

}

//Load data.
const loadData = async () => {

	//USERS
	console.log('\n> Users\n');

	await models.User.create({
		firstName: 'Macarena',
		lastName: 'Wayna',
		phone: '123456789',
		email: 'maca.way@gmail.com'
	});

	await models.User.create({
		firstName: 'Norah',
		lastName: 'jones',
		phone: '987654321',
		email: 'nora.jones@gmail.com'
	});

	await models.User.create({
		firstName: 'Kyle',
		lastName: 'Keller',
		phone: '123456789',
		email: 'kukell@gmail.com'
	});


	//Restaurant.
	console.log('\n> Restaurant\n');

	await models.Restaurant.create({
		logo: 'https://media.giphy.com/media/xTiQywoljp8Bl6nDxu/giphy.gif',
		commercialName: 'Pizza 1',
		legalName: 'Pizza SRL',
		commercialEmail: 'pizza@gmail.com',
		adminNumber: '1166579812',
		address: 'Av. Corrientes 751, C1043AAH CABA',
		latitude: -34.6033082,
		longitude: -58.3772945,
		rating: 5
	});

	await models.Restaurant.create({
		logo: 'https://media.giphy.com/media/xTiQywoljp8Bl6nDxu/giphy.gif',
		commercialName: 'Pizza 2',
		legalName: 'Pizza 2',
		commercialEmail: 'pizza@gmail.com',
		adminNumber: '1162573810',
		address: 'Av. Callao 83, C1022AAA CABA',
		latitude: -34.6033082,
		longitude: -58.3772945,
		rating: 2
	});

	await models.Restaurant.create({
		logo: 'https://media.giphy.com/media/xTiQywoljp8Bl6nDxu/giphy.gif',
		commercialName: 'Pizza 4',
		legalName: 'Pizza 4',
		commercialEmail: 'pizza@gmail.com',
		adminNumber: '1166579812',
		address: 'Av. Corrientes 838, C1043AAV CABA',
		latitude: -34.6041581,
		longitude: -58.37853140000001,
		rating: 3
	});

	//Meals.
	console.log('\n> Meal\n');

	await models.Meal.create({name: 'Chiken', description: 'Chiken', price: 200, restaurant_id: 1});
	await models.Meal.create({name: 'French fries', description: 'French fries', price: 300, restaurant_id: 1});
	await models.Meal.create({name: 'Soda', description: 'Soda', price: 50, restaurant_id: 1});
	await models.Meal.create({name: 'Salmon', description: 'Salmon', price: 100, restaurant_id: 1});

	await models.Meal.create({name: 'Potato', description: 'Potato', price: 200, restaurant_id: 2});
	await models.Meal.create({name: 'Burger', description: 'Burger', price: 300, restaurant_id: 2});
	await models.Meal.create({name: 'Chicken', description: 'Chicken', price: 500, restaurant_id: 2});
	await models.Meal.create({name: 'Coke', description: 'Coke', price: 100, restaurant_id: 2});

	await models.Meal.create({name: 'Burger', description: 'Burger', price: 400, restaurant_id: 3});
	await models.Meal.create({name: 'Noodles', description: 'Noodles', price: 30, restaurant_id: 3});
	await models.Meal.create({name: 'Water', description: 'Water', price: 50, restaurant_id: 3});
	await models.Meal.create({name: 'Beer', description: 'Beer', price: 100, restaurant_id: 3});

}

//Create schema.
createSchema().then(() => {

	//Load data.
	loadData().then(() => {

		console.log('\n> Schema created OK.\n');
		process.exit();

	}).catch((err) => {

		console.log('\n> Error loading data.\n', err);
		process.exit();

	});

}).catch((err) => {

	console.log('\n> Error creating schema.\n', err);
	process.exit();

});