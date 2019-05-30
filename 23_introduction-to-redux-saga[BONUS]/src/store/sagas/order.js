import {put} from 'redux-saga/effects'

import axios from "../../axios-orders";
import {purchaseBurgerFail, purchaseBurgerStart, purchaseBurgerSucces, fetchOrdersFaild, fetchOrdersStart, fetchOrdersSuccess} from "../actions/index";


export function* purchaseBurgerSaga(action) {
	yield put(purchaseBurgerStart())

	try {
		const response = yield axios.post( '/orders.json?auth=' + action.token, action.orderData )
		yield put(purchaseBurgerSucces(response.data.name, action.orderData))
	}catch (err) {
		yield put(purchaseBurgerFail(err))
	}
}

export function* fetchOrdersSaga(action) {
	yield put(fetchOrdersStart() )
	const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"'
	console.log(queryParams)

	try {
		const response = yield axios.get('/orders.json?auth=' + queryParams)
		const fetchedOrders = [];
		for (let key in response.data) {
			fetchedOrders.push({
				...response.data[key],
				id: key
			});

			yield put(fetchOrdersSuccess(fetchedOrders))
	}} catch (err) {
		yield put(fetchOrdersFaild(err))
	}

}