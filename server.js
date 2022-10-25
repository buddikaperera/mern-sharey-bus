require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('./config/dbConnect')();

const app = express();

/// middleware
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

const port = process.env.PORT || 5000;

//app.use(
//cors({
//origin: 'http://localhost:3000',
////})
//);
const usersRoute = require('./routes/usersRoute');
const busesRoute = require('./routes/busesRoute');
app.use('/api/users', usersRoute);
app.use('/api/buses', busesRoute);

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	);
// 	if (req.method === 'OPTIONS') {
// 		res.header(
// 			'Access-Control-Allow-Methods',
// 			'PUT, POST, PATCH, DELETE, GET'
// 		);
// 		return res.status(200).json({});
// 	}

// 	res.status(200).end();
// });

//app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
///https://stackoverflow.com/questions/65826508/post-request-is-keeping-pending-but-never-gives-response
