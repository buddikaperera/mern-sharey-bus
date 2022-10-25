import React from 'react';
import { Form, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
const Login = () => {
	//const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const onFinishHandler = async (values) => {
		try {
			dispatch(showLoading());
			const response = await axios.post('/api/users/login', values);

			//alert(response.data.data);
			console.log('LOGIN USER ==>', response); ///statusCode
			//setLoading(false);
			dispatch(hideLoading());
			if (response.status === 200) {
				message.success(response.data.message);
				//alert(response.data.data);
				localStorage.setItem('token', response.data.data);
				navigate('/');
			} else {
				message.error(response.data.messagez);
			}
		} catch (error) {
			dispatch(hideLoading());
			console.log(
				'response @@@@@@@@@',
				error || error.response.data.message
			);
			if (error.response.status === 400)
				message.error(error.response.data.message, 3);
		}
	};

	return (
		<div className="h-screen d-flex justify-content-center align-items-center">
			<div className="w-400 card p-3">
				<h2 className="text-lg">Login</h2>
				<hr />
				<Form layout="vertical" onFinish={onFinishHandler}>
					<Form.Item label="E-mail" name="email">
						<input type="text" />
					</Form.Item>

					<Form.Item label="Password" name="password">
						<input type="password" />
					</Form.Item>
					<div className="d-flex justify-content-between align-items-center">
						<Link to="/register">Click here to Register</Link>
						<button className="secondary-btn" type="submit">
							Login
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Login;
