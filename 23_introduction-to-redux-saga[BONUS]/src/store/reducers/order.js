import * as actionType from '../actions/actionTypes'
import {updateOvject} from "../../shared/utility";

const initialState = {
	orders: [],
	loading: false,
	purchased: false
}

const purchaseInit = ( state, action ) => {
	return updateOvject( state, { purchased: false } );
};

const purchaseBurgerStart = ( state, action ) => {
	return updateOvject( state, { loading: true } );
};

const purchaseBurgerSuccess = ( state, action ) => {
	const newOrder = updateOvject( action.orderData, { id: action.orderId } );
	return updateOvject( state, {
		loading: false,
		purchased: true,
		orders: state.orders.concat( newOrder )
	} );
};

const purchaseBurgerFail = ( state, action ) => {
	return updateOvject( state, { loading: false } );
};

const fetchOrdersStart = ( state, action ) => {
	return updateOvject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
	return updateOvject( state, {
		orders: action.orders,
		loading: false
	} );
};

const fetchOrdersFail = ( state, action ) => {
	return updateOvject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionType.PURCHASE_INIT: return purchaseInit( state, action );
		case actionType.PURCHASE_BURGER_START: return purchaseBurgerStart( state, action );
		case actionType.PURCHASE_BURGER_SUCCES: return purchaseBurgerSuccess( state, action )
		case actionType.PURCHASE_BURGER_FAIL: return purchaseBurgerFail( state, action );
		case actionType.FETCH_ORDERS_START: return fetchOrdersStart( state, action );
		case actionType.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
		case actionType.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
		default: return state;
	}
};

export default reducer;