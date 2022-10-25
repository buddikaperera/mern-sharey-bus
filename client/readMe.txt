npm i axios antd redux react-redux  @reduxjs/toolkit

npm i react-router-dom

bootrap
https://getbootstrap.com/ cdn

get icons from https://remixicon.com/

cdn

https://github.com/Remix-Design/remixicon#usage

antd

https://ant.design/docs/react/introduce
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less' in app.js


folders
components
pages
resources
redux


Reducx implemantation with tool kit 

(1) create a slice 

in the redux folder alertsSlice import create slice 

import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
	name: 'alerts',
	initialState: {
		loading: false,
	},
	reducers: {
		showLoading: (state, action) => {
			state.loading = true;
		},
		hideLoading: (state, action) => {
			state.loading = false;
		},
	},
});

export const { showLoading, hideLoading } = alertsSlice.actions;
export default alertsSlice.reducer;



usersSlice

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
	},
	reducers: {
		SetUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { SetUser } = userSlice.actions;
export default userSlice.reducer;




(2) in the redux folder create store.js
  store.js

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import alertsRreducer from './alertsSlice';
import usersRreducer from './userSlice';

const rootReducer = combineReducers({
	alerts: alertsRreducer,
	user: usersRreducer,
});

// export default configureStore({
// 	///reducer = rootReducer,
// 	reducer: {
// 		user: usersRreducer,
// 	},
// });

const store = configureStore({
	reducer: rootReducer,
});

export default store;



(3) go to the index.js 

import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);


import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
	dispatch(SetUser(response.data.data));