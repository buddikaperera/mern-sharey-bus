const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, jwtKey);

			///var userId = decoded.id;
			console.log('userId', decoded.userId);

			///const { userId } = decoded.userId;

			//const user = await User.findById(decoded.userId);

			console.log('decoded', decoded);

			//req.user = user;

			req.body.userId = decoded.userId;
			next();

			//const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
			//req.body.userId = decoded;
			//next();
		} catch (error) {
			return res.status(401).json({
				message: 'Not authorized for the request ,invalid token!',
				success: false,
			});
		}
	}
};
