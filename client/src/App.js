import 'antd/dist/antd.min.css';
import './resources/global.css';
///https://www.youtube.com/watch?v=4mOkFXyxfsU

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import AdminHome from './pages/Admin/AdminHome';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminBuses from './pages/Admin/AdminBuses';
import AdminBooking from './pages/Admin/AdminBooking';

function App() {
	const { loading } = useSelector((state) => state.alerts);
	return (
		<div>
			{loading && <Loader />}
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/home"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin"
						element={
							<ProtectedRoute>
								<AdminHome />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/users"
						element={
							<ProtectedRoute>
								<AdminUsers />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/buses"
						element={
							<ProtectedRoute>
								<AdminBuses />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin/booking"
						element={
							<ProtectedRoute>
								<AdminBooking />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/register"
						element={
							<PublicRoute>
								<Register />
							</PublicRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<PublicRoute>
								<Login />
							</PublicRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
