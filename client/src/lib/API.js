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

		updateOne         : function(authToken, id, updatedInfo) {
			return axios({
				url     : `/api/u/${id}`,
				method  : 'PUT',
				data    : { updatedInfo },
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		updateOnePassword : function(
			authToken,
			id,
			oldPassword,
			newPassword
		) {
			return axios({
				url     : `/api/u/${id}/password`,
				method  : 'PUT',
				data    : { oldPassword, newPassword },
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		deleteOne         : function(authToken, id) {
			return axios({
				url     : `/api/u/${id}`,
				method  : 'DELETE',
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		}
	},

	Board : {
		getAll    : function(authToken) {
			return axios({
				url     : '/api/b',
				method  : 'GET',
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		getMy     : function(authToken) {
			return axios({
				url     : '/api/b/my-boards',
				method  : 'GET',
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		getOne    : function(authToken, id) {
			return axios({
				url     : `/api/b/${id}`,
				method  : 'GET',
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		createOne : function(authToken, newBoard) {
			return axios({
				url     : '/api/b',
				method  : 'POST',
				data    : { newBoard },
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		updateOne : function(authToken, id, updatedInfo) {
			return axios({
				url     : `/api/b/${id}`,
				method  : 'PUT',
				data    : { updatedInfo },
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		deleteOne : function(authToken, id) {
			return axios({
				url     : `/api/b/${id}`,
				method  : 'DELETE',
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		}
	},

	List  : {
		getAll        : function(authToken) {
			return axios({
				url     : '/api/l',
				method  : 'GET',
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		getAllInBoard : function(authToken, boardId) {
			return axios({
				url     : `/api/l/b/${boardId}`,
				method  : 'GET',
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		getOne        : function(authToken, listId) {
			return axios({
				url     : `/api/l/${listId}`,
				method  : 'GET',
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		createOne     : function(authToken, newList) {
			return axios({
				url     : '/api/l',
				method  : 'POST',
				data    : { newList },
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		updateMany    : function(authToken, updatedInfo) {
			return axios({
				url     : `/api/l/`,
				method  : 'PUT',
				data    : { updatedInfo },
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		updateOne     : function(authToken, id, updatedInfo) {
			return axios({
				url     : `/api/l/${id}`,
				method  : 'PUT',
				data    : { updatedInfo },
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		},

		deleteOne     : function(authToken, id) {
			return axios({
				url     : `/api/l/${id}`,
				method  : 'DELETE',
				headers : {
					Authorization : `Bearer ${authToken}`
				}
			});
		}
	}
};
