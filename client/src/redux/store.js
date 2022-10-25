import { combineReducers, configureStore } from '@reduxjs/toolkit';
import alertsRreducer from './alertsSlice';
import usersRreducer from './userSlice';

const rootReducer = combineReducers({
	alerts: alertsRreducer,
	user: usersRreducer, ///user selector var
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
