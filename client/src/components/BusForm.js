import React from 'react';
import { Modal, Row, Form, Col, message } from 'antd';
import { useDispatch } from 'react-redux';
//import axios from 'axios';
import { axiosInstance } from '../helpers/axiosInstance';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import moment from 'moment';

const BusForm = ({
	showBusForm,
	setShowBusForm,
	modalTitle,
	type = 'add',
	selectedBus,
	getData,
	setSelectedBus,
}) => {
	const dispatch = useDispatch();

	const onFinishHanler = async (values) => {
		console.log(values);

		try {
			dispatch(showLoading());
			let response = null;

			if (type === 'add') {
				response = await axiosInstance.post(
					'/api/buses/add-bus',
					values
				);
			} else {
				response = await axiosInstance.post('/api/buses/update-bus', {
					...values,
					_id: selectedBus._id,
				});
			}
			dispatch(hideLoading());

			if (response.data.success) {
				message.success(response.data.message);
				setShowBusForm(false);
			} else {
				message.error(response.data.message);
				setShowBusForm(true);

				console.log('showBusForm error', showBusForm);
			}
			getData();
			setShowBusForm(false);
			setSelectedBus(null);
		} catch (error) {
			console.log('error ---->', error);
			dispatch(hideLoading());
			message.error(error.message);
		}
	};

	return (
		<Modal
			width={800}
			title={modalTitle}
			open={showBusForm}
			onCancel={() => setShowBusForm(false)}
			footer={false}
		>
			<Form
				layout="vertical"
				onFinish={onFinishHanler}
				initialValues={selectedBus}
			>
				<Row gutter={[10, 10]}>
					<Col lg={24} xs={24}>
						<Form.Item label="Bus Name" name="name">
							<input type="text" />
						</Form.Item>
					</Col>

					<Col lg={12} xs={24}>
						<Form.Item label="Bus Number" name="number">
							<input type="text" />
						</Form.Item>
					</Col>

					<Col lg={12} xs={24}>
						<Form.Item label="Capacity" name="capacity">
							<input type="text" />
						</Form.Item>
					</Col>

					<Col lg={12} xs={24}>
						<Form.Item label="From" name="from">
							<input type="text" />
						</Form.Item>
					</Col>

					<Col lg={12} xs={24}>
						<Form.Item label="To" name="to">
							<input type="text" />
						</Form.Item>
					</Col>

					<Col lg={8} xs={24}>
						<Form.Item label="Journey Date" name="journeyDate">
							<input type="date" />
						</Form.Item>
					</Col>

					<Col lg={8} xs={24}>
						<Form.Item label="Departure" name="depature">
							<input type="text" />
						</Form.Item>
					</Col>

					<Col lg={8} xs={24}>
						<Form.Item label="Arrival" name="arrival">
							<input type="text" />
						</Form.Item>
					</Col>

					<Col lg={12} xs={24}>
						<Form.Item label="Type" name="type">
							<input type="text" />
						</Form.Item>
					</Col>

					<Col lg={12} xs={24}>
						<Form.Item label="Fare" name="fare">
							<input type="text" />
						</Form.Item>
					</Col>
				</Row>
				<div className="d-flex justify-content-end">
					<button className="secondary-btn" type="submit">
						Save
					</button>
				</div>
			</Form>
		</Modal>
	);
};

export default BusForm;
