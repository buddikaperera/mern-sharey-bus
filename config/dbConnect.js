const mongoose = require('mongoose');

const dbConnect = () => {
	mongoose
		.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('connected to the Mongo DB');
		})
		.catch((error) =>
			console.log('connected to Mongo DB fails', error.message || error)
		);
};

module.exports = dbConnect;
