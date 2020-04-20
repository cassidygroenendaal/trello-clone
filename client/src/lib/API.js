import axios from 'axios';

export default {
	User  : {
		getMe             : function(authToken) {
			return axios({
				url     : '/api/u/me',
				method  : 'GET',
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		register          : function(newUser) {
			return axios({
				url    : '/api/u/register',
				method : 'POST',
				data   : { newUser }
			});
		},

		login             : function(userData) {
			return axios({
				url    : '/api/u/login',
				method : 'POST',
				data   : userData
			});
		},

		forgot            : function(email) {
			return axios({
				url    : '/api/u/forgot',
				method : 'POST',
				data   : { email }
			});
		},

		findResetUser     : function(token) {
			return axios({
				url    : `/api/u/reset/${token}`,
				method : 'GET'
			});
		},

		resetPassword     : function(userData) {
			return axios({
				url    : '/api/u/reset',
				method : 'PUT',
				data   : userData
			});
		},

		getAll            : function() {
			return axios({
				url    : '/api/u',
				method : 'GET'
			});
		},

		getOne            : function(id) {
			return axios({
				url    : `/api/u/${id}`,
				method : 'GET'
			});
		},

		updateOne         : function(id, updatedInfo) {
			return axios({
				url    : `/api/u/${id}`,
				method : 'PUT',
				data   : { updatedInfo }
			});
		},

		updateOnePassword : function(id, oldPassword, newPassword) {
			return axios({
				url    : `/api/u/${id}/password`,
				method : 'PUT',
				data   : { oldPassword, newPassword }
			});
		},

		deleteOne         : function(id) {
			return axios({
				url    : `/api/u/${id}`,
				method : 'DELETE'
			});
		}
	},

	Board : {
		getAll    : function() {
			return axios({
				url    : '/api/b',
				method : 'GET'
			});
		},

		getOne    : function(id) {
			return axios({
				url    : `/api/b/${id}`,
				method : 'GET'
			});
		},

		createOne : function(newBoard) {
			return axios({
				url    : '/api/b',
				method : 'POST',
				data   : { newBoard }
			});
		},

		updateOne : function(id, updatedBoard) {
			return axios({
				url    : `/api/b/${id}`,
				method : 'PUT',
				data   : { updatedBoard }
			});
		},

		deleteOne : function(id) {
			return axios({
				url    : `/api/b/${id}`,
				method : 'DELETE'
			});
		}
	}
};
