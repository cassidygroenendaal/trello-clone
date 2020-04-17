import axios from 'axios';

export default {
	User   : {
		getMe         : function() {
			return axios({
				url    : '/api/u/me',
				method : 'GET'
			});
		},

		register      : function(userData) {
			return axios({
				url    : '/api/u/register',
				method : 'POST',
				data   : userData
			});
		},

		login         : function(userData) {
			return axios({
				url    : '/api/u/login',
				method : 'POST',
				data   : userData
			});
		},

		logout        : function() {
			return axios({
				url    : '/api/u/logout',
				method : 'GET'
			});
		},

		forgot        : function(email) {
			return axios({
				url    : '/api/u/forgot',
				method : 'POST',
				data   : { email }
			});
		},

		findResetUser : function(token) {
			return axios({
				url    : `/api/u/reset/${token}`,
				method : 'GET'
			});
		},

		resetPassword : function(userData) {
			return axios({
				url    : '/api/u/reset',
				method : 'PUT',
				data   : userData
			});
		},

		getAll        : function() {
			return axios({
				url    : '/api/u',
				method : 'GET'
			});
		},

		getOne        : function(id) {
			return axios({
				url    : `/api/u/${id}`,
				method : 'GET'
			});
		},

		updateOne     : function(id, updatedUser) {
			return axios({
				url    : `/api/u/${id}`,
				method : 'PUT',
				data   : { updatedUser }
			});
		},

		deleteOne     : function(id) {
			return axios({
				url    : `/api/u/${id}`,
				method : 'DELETE'
			});
		}
	},
	Model1 : {
		getAll    : function() {
			return axios({
				url    : '/api/model1',
				method : 'GET'
			});
		},

		getOne    : function(id) {
			return axios({
				url    : `/api/model1/${id}`,
				method : 'GET'
			});
		},

		createOne : function(newModel1) {
			return axios({
				url    : '/api/model1',
				method : 'POST',
				data   : { newModel1 }
			});
		},

		updateOne : function(id, updatedModel1) {
			return axios({
				url    : `/api/model1/${id}`,
				method : 'PUT',
				data   : { updatedModel1 }
			});
		},

		deleteOne : function(id) {
			return axios({
				url    : `/api/model1/${id}`,
				method : 'DELETE'
			});
		}
	}
};
