import axios from '../../axios-orders'
import {put, delay} from 'redux-saga/effects'

import * as actions from '../actions/index'

export function* initIngredientsSaga(action) {
	try {
		const response = yield axios.get('https://myburgerbuilder-smajke.firebaseio.com/ingredients.json')
		console.log(response)
		yield put(actions.setIngredients(response.data))
	} catch (e) {
		yield put(actions.fetchIngredientsFailed())
	}

}