import * as actionTypes from './actionTypes'
import axios from "../../axios-orders";

export const purchaseBurgerSucces = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCES,
		orderId: id,
		orderData: orderData
	}
}

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
		error: error
	}
}

export const purchaseBurgerStart = () => {
	return{
		type: actionTypes.PURCHASE_BURGER_START
	}
}

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart())
		axios.post( '/orders.json?auth=' + token, orderData )
			.then( response => {
				dispatch(purchaseBurgerSucces(response.data.name, orderData))
			} )
			.catch( error => {
				dispatch(purchaseBurgerFail(error))
			} );
	}
}

export const purchaseInit = () => {
	return {type: actionTypes.PURCHASE_INIT}
}

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFaild = (error) => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
		error: error
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart() )
		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
		axios.get('/orders.json?auth=' + queryParams)
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders))
			})
			.catch(err => {
				dispatch(fetchOrdersFaild(err))
			});
	}
}