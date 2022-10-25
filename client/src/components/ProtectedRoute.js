import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import DefaultLayout from './DefaultLayout';
const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	//const { loading } = useSelector((state) => state.alerts);

	const { user } = useSelector((state) => state.user);

	const token = localStorage.getItem('token');
	const validateToken = async () => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				'/api/users/verify',
				{},

				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			//console.log('<===== RESPONSE STATUS ====>', response.data.message);

			if (response.data.success) {
				//setLoading(false);

				dispatch(setUser(response.data.data));
			} else {
				//setLoading(false);

				localStorage.removeItem('token');
				navigate('/login');
			}
			dispatch(hideLoading());
		} catch (error) {
			//setLoading(false);
			dispatch(hideLoading());
			console.log('<===== RESPONSE error ====>', error);
			localStorage.removeItem('token');
			navigate('/login');
		}
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			validateToken();
		} else {
			navigate('/login');
		}
	}, []);

	///console.log('loading', loading);
	return (
		<div>
			{
				//loading ? (
				//<div>Loading..</div>
				//) : (
				user && (
					<React.Fragment>
						<DefaultLayout>{children}</DefaultLayout>
					</React.Fragment>
				)
			}
		</div>
	);
};

export default ProtectedRoute;
