import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
	name: 'alerts',
	initialState: {
		loading: false,
	},
	reducers: {
		///actions
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
