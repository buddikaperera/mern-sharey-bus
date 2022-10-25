const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const Bus = require('../models/busModel');

router.post('/add-bus', async (req, res) => {
	const { busNumber } = req.body; //.number

	try {
		let busExist = await Bus.findOne({ number: req.body.number }).exec();
		if (busExist) {
			return res.status(200).json({
				message: `Bus number ${req.body.number} is already exists!`,
				success: false,
				data: null,
			});
		}

		const newBus = new Bus(req.body);
		await newBus.save();

		console.log('BUS CREATED  ', newBus);
		return res.status(200).json({
			message: 'Bus successfully created!',
			success: true,
			data: newBus,
		});
	} catch (error) {
		console.log('CREATE BUS FAILED ', error);
		return res.status(500).json({
			error: error || error.message,
			success: false,
			data: null,
		});
	}
});

router.post('/update-bus', authMiddleware, async function (req, res) {
	console.log('userId--->', req.body.userId);

	try {
		await Bus.findByIdAndUpdate(req.body._id, req.body);

		return res.status(200).json({
			message: 'Bus updated  succefully..!',
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Bus updation  fails!' + error.message,
			success: false,
		});
	}
});

router.post('/delete-bus', authMiddleware, async function (req, res) {
	console.log('userId--->', req.body.userId);

	try {
		await Bus.findByIdAndDelete(req.body._id);

		return res.status(200).json({
			message: 'Busses fetch  succefully..!',
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Buses fetch  fails!' + error.message,
			success: false,
		});
	}
});

router.post('/get-all-buses', authMiddleware, async function (req, res) {
	console.log('userId--->', req.body.userId);

	try {
		const buses = await Bus.find();

		return res.status(200).json({
			message: 'Busses fetch  succefully..!',
			success: true,
			data: buses,
		});
	} catch (error) {
		return res.status(400).json({
			message: 'Buses fetch  fails!' + error.message,
			success: false,
			data: null,
		});
	}
});

module.exports = router;
