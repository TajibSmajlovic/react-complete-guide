import axios from 'axios'

import * as actionTypes from './actionTypes'

 export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
 }

 export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	}
 }

 export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

export const logOut = () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logOut())
		}, expirationTime * 1000)
	}
}

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart())
		const authData= {
			email: email,
			password: password,
			returnSecureToken: true
		}
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBRvwM7f7UXjxyywiwZLxXiymp0Hv28VAY'
		if (!isSignup) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBRvwM7f7UXjxyywiwZLxXiymp0Hv28VAY'
		}

		axios.post(url, authData)
			.then(response => {
				dispatch(authSuccess(response.data.idToken, response.data.localId))
				dispatch(checkAuthTimeout(response.data.expiresIn))
			})
			.catch(err => {
				dispatch(authFail(err.response.data.error))
			})
	}
}