const mongoose = require('mongoose');

const busSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		number: {
			type: String,
			required: true,
		},
		capacity: {
			type: Number,
			required: true,
		},
		from: {
			type: String,
			required: true,
		},

		to: {
			type: String,
			required: true,
		},

		journeyDate: {
			type: String, //// YYYY-MM-DD
			required: true,
		},

		depature: {
			type: String,
			required: true,
		},

		arrival: {
			type: String,
			required: true,
		},

		type: {
			type: String,
			required: true,
		},

		fare: {
			type: Number,
			required: true,
		},
		seatsBooked: {
			type: Array,
			default: [],
		},
		status: {
			type: String,
			default: 'Yet to Start',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Buses', busSchema);
