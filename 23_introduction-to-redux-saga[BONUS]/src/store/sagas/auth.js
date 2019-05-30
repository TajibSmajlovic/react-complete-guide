import axios from 'axios'
import { put, delay, call } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import * as actions from '../actions/index'
import {authFail, authStart, authSuccess, checkAuthTimeout} from "../actions/auth";

export function* logoutSaga(action) {
	yield call([localStorage, 'removeItem'], 'token')
	yield call([localStorage, 'removeItem'], 'expirationDate')
	yield call([localStorage, 'removeItem'], 'userID')

	/*yield localStorage.removeItem('token')
	yield localStorage.removeItem('expirationDate')
	yield localStorage.removeItem('userID')*/

	yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000)
	yield put(actions.logOut())
}

export function* authUserSaga(action) {
	yield put(actions.authStart())
	const authData= {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	}
	let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBRvwM7f7UXjxyywiwZLxXiymp0Hv28VAY'
	if (!action.isSignup) {
		url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBRvwM7f7UXjxyywiwZLxXiymp0Hv28VAY'
	}

	try {
		const response = yield axios.post(url, authData)
		const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)

		yield localStorage.setItem('token', response.data.idToken)
		yield localStorage.setItem('expirationDate', expirationDate)
		yield localStorage.setItem('userID', response.data.localId)

		yield put(actions.authSuccess(response.data.idToken, response.data.localId))
		yield put(actions.checkAuthTimeout(response.data.expiresIn))
	} catch (err) {
		yield put(authFail(err.response.data.error))
	}
}

export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem('token')
	if (!token) {
		yield put(actions.logOut())
	} else {
		const expirationTime = yield new Date(localStorage.getItem('expirationDate'))
		if (expirationTime <= new Date()) {
			yield put(actions.logOut())
		} else {
			const userID = yield localStorage.getItem('userID')
			yield put(authSuccess(token, userID))
			yield put(actions.checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000 ));
		}
	}
}