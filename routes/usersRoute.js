const express = require('express');
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// register new user ////

router.post('/register', async function (req, res) {
	const { name, email, password } = req.body;

	//console.log(name, email, password);

	if (!name) {
		return res.status(400).json({
			message: 'Name is required!',
			success: false,
		});
	}

	if (!email) {
		return res.status(400).json({
			message: 'Email is required!',
			success: false,
		});
	}

	if (!password) {
		return res.status(400).json({
			message: 'Password is required!',
			success: false,
		});
	}

	if (!password || password.length < 6) {
		return res.status(400).json({
			message: 'Password is required and should be 6 characters long!',
			success: false,
		});
	}

	let userExist = await User.findOne({ email }).exec();
	if (userExist) {
		return res.status(400).json({
			message: `E-mail ${email} is already taken!`,
			success: false,
			data: null,
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	req.body.password = hashedPassword;

	const user = new User(req.body);

	try {
		await user.save();
		console.log('USER CREATED  ', user);
		return res.status(200).json({
			message: 'User successfully created!',
			success: true,
			data: user,
		});
	} catch (error) {
		console.log('CREATE USER FAILED ', error);
		return res.status(400).json({
			error: error || error.message,
			success: false,
			data: null,
		});
	}
});

///// login user ////

router.post('/login', async function (req, res) {
	const { email, password } = req.body;

	//console.log(email, password);

	if (!email) {
		return res.status(400).json({
			message: 'Email is required!',
			success: false,
		});
	}

	if (!password) {
		return res.status(400).json({
			message: 'Password is required!',
			success: false,
		});
	}

	if (!password || password.length < 6) {
		return res.status(400).json({
			message: 'Password is required and should be 6 characters long!',
			success: false,
		});
	}

	try {
		let userExist = await User.findOne({ email });

		if (!userExist) {
			return res.status(400).json({
				message: 'User does not exists!',
				success: false,
				data: null,
			});
		}

		const passwordMatch = await bcrypt.compare(
			password,
			userExist.password
		);

		if (!passwordMatch) {
			return res.status(400).json({
				message: 'User credetials does not matchs!',
				success: false,
				data: null,
			});
		}
		///generate token jwt ///JWT_SECRET_KEY

		const token = jwt.sign(
			{ userId: userExist._id },
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: '1d',
			}
		);
		///console.log('<===== TOKENZ =====>', token);

		return res.status(200).json({
			message: 'User login succefull!',
			success: true,
			data: token,
		});
	} catch (error) {
		console.log('<===== CREATE USER LOGIN FAILS =====> ', error);
		return res.status(400).json({
			message: error || error.message,
			success: false,
			data: null,
		});
	}
});

/// validate token and idetify the user with auth middleware

router.post('/verify', authMiddleware, async function (req, res) {
	console.log('get-user--->', 'get-user');

	console.log('userId--->', req.body.userId);

	try {
		const user = await User.findById(req.body.userId);
		console.log('ssss');
		return res.status(200).json({
			message: 'User fetch  succefully..!',
			success: true,
			data: user,
		});
	} catch (error) {
		return res.status(400).json({
			message: 'User fetch  fails!',
			success: false,
			data: null,
		});
	}
});

module.exports = router;
