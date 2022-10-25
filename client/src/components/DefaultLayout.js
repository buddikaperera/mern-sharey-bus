import React, { useState } from 'react';
import '../resources/layout.css';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
function DefaultLayout({ children }) {
	const { user } = useSelector((state) => state.user);

	///console.log('isAdmin', isAdmin);
	const userMenu = [
		{
			name: 'Home',
			path: '/',
			icon: 'ri-home-line',
		},
		{
			name: 'Bookings',
			path: '/bookings',
			icon: 'ri-file-list-line',
		},
		{
			name: 'Profile',
			path: '/profile',
			icon: 'ri-user-line',
		},

		{
			name: 'Logout',
			path: '/logout',
			icon: 'ri-logout-box-r-line',
		},
	];

	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();

	const adminMenu = [
		{
			name: 'Home',
			path: '/admin',
			icon: 'ri-home-line',
		},
		{
			name: 'Users',
			path: '/admin/users',
			icon: 'ri-user-line',
		},
		{
			name: 'Buses',
			path: '/admin/buses',
			icon: 'ri-bus-line',
		},

		{
			name: 'Booking',
			path: '/admin/booking',
			icon: 'ri-file-list-line', ///11.00
		},

		{
			name: 'Logout',
			path: '/logout',
			icon: 'ri-logout-box-r-line',
		},
	];

	const menuTobeRendered = user?.isAdmin ? adminMenu : userMenu;
	const activeRoute = window.location.pathname;

	return (
		<div className="layout-parent">
			<div className="sidebar">
				<div class="sidebar-header">
					<h1 className="logo">SB</h1>
					<h1 className="role">
						{user?.name}
						<br />
						{user?.isAdmin ? 'Admin' : 'User'}
					</h1>
				</div>
				<div className="d-flex flex-column gap-3 justify-content-start menu">
					{menuTobeRendered.map((item, index) => {
						return (
							<div
								className={`${
									activeRoute === item.path &&
									'active-menu-item'
								} menu-item`}
							>
								<i className={item.icon}></i>

								{!collapsed && (
									<span
										onClick={() => {
											if (item.path === '/logout') {
												localStorage.removeItem(
													'token'
												);
												navigate('/login');
											} else {
												navigate(item.path);
											}
										}}
									>
										{item.name}
									</span>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<div className="body">
				<div class="header">
					{collapsed ? (
						<i
							class="ri-menu-2-fill"
							onClick={() => setCollapsed(!collapsed)}
						></i>
					) : (
						<i
							class="ri-close-line"
							onClick={() => setCollapsed(!collapsed)}
						></i>
					)}
				</div>

				<div class="content">{children}</div>
			</div>
		</div>
	);
}

export default DefaultLayout;
