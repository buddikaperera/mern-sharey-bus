import React, { useState } from 'react';
import { Form, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';

const Register = () => {
	//const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const onFinishHandler = async (values) => {
		try {
			//setLoading(true);
			dispatch(showLoading());
			const response = await axios.post('/api/users/register', values);
			console.log('REGISTER USER ==>', response); ///statusCode
			//setLoading(false); //response.data.success
			if (response.status === 200) {
				message.success(response.data.message);
			} else {
				message.error(response.data.message);
			}
			dispatch(hideLoading());
		} catch (error) {
			//setLoading(false);
			dispatch(hideLoading());
			console.log(
				'response @@@@@@@@@',
				error || error.response.data.message
			);
			if (error.response.status === 400)
				message.error(error.response.data.message);
		}
	};

	return (
		<div className="h-screen d-flex justify-content-center align-items-center">
			<div className="w-400 card p-3">
				<h2 className="text-lg">Register</h2>
				<hr />
				<Form layout="vertical" onFinish={onFinishHandler}>
					<Form.Item label="Name" name="name">
						<input type="text" />
					</Form.Item>

					<Form.Item label="E-mail" name="email">
						<input type="text" />
					</Form.Item>

					<Form.Item label="Password" name="password">
						<input type="password" />
					</Form.Item>
					<div className="d-flex justify-content-between align-items-center">
						<Link to="/login">Click to Login</Link>
						<button className="secondary-btn" type="submit">
							Register
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Register;
