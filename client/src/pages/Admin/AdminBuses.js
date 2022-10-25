import React, { useState, useEffect } from 'react';
import BusForm from '../../components/BusForm';
import PageTitle from '../../components/PageTitle';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { message, Table } from 'antd';
import { axiosInstance } from '../../helpers/axiosInstance';
import moment from 'moment';

const AdminBuses = () => {
	const [showBusForm, setShowBusForm] = useState(false);
	const [buses, setBuses] = useState([]);
	const [selectedBus, setSelectedBus] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		getAllBuses();
	}, []);

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name', //mongo db model
		},

		{
			title: 'Number',
			dataIndex: 'number',
		},

		{
			title: 'From',
			dataIndex: 'from',
		},
		{
			title: 'To',
			dataIndex: 'to',
		},
		{
			title: 'Journey Date',
			dataIndex: 'journeyDate',
			//render: (journeyDate) => moment(journeyDate).format('dd-mm-yyyy'),
		},

		{
			title: 'Status',
			dataIndex: 'status',
		},

		{
			title: 'Action',
			dataIndex: 'action',
			render: (action, record) => (
				<div className="d-flex gap-3">
					<i
						class="ri-delete-bin-line"
						onClick={() => deleteBus(record._id)}
					></i>
					<i
						class="ri-pencil-line"
						onClick={() => {
							setSelectedBus(record);

							setShowBusForm(true);
						}}
					></i>
				</div>
			),
		},
	];

	const deleteBus = async (id) => {
		try {
			dispatch(showLoading());
			const response = await axiosInstance.post('/api/buses/delete-bus', {
				_id: id,
			});
			console.log('RESPONSE ---->', response.data.data);
			dispatch(hideLoading());

			if (response.data.success) {
				message.success(response.data.message);
				setBuses(response.data.data);
				getAllBuses();
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			message.error(error.response.data.message);
		}
	};

	const getAllBuses = async () => {
		try {
			dispatch(showLoading());
			const response = await axiosInstance.post(
				'/api/buses/get-all-buses',
				{}
			);
			console.log('RESPONSE ---->', response.data.data);
			dispatch(hideLoading());

			if (response.data.success) {
				setBuses(response.data.data);
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			message.error(error.response.data.message);
		}
	};

	return (
		<div>
			<div className="d-flex justify-content-between">
				<PageTitle title="Buses" />
				<button
					className="secondary-btn"
					onClick={() => {
						setShowBusForm(!showBusForm);
						setSelectedBus(null);
					}}
				>
					Add Bus
				</button>
			</div>
			<Table columns={columns} dataSource={buses} />

			{showBusForm && (
				<BusForm
					modalTitle={selectedBus ? 'Edit Bus' : 'Add Bus'}
					showBusForm={showBusForm}
					setShowBusForm={setShowBusForm}
					type={selectedBus ? 'edit' : 'add'}
					selectedBus={selectedBus}
					getData={getAllBuses}
					setSelectedBus={setSelectedBus}
				/>
			)}
		</div>
	);
};

export default AdminBuses;
