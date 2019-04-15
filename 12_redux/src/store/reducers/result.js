import * as actionType from '../actions'

const initialState = {
	results: []
}

const resultsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.STORE_RESULT:
			return {
				...state,
				results: state.results.concat({id:  new Date(), value: action.result})
			}
		case actionType.REMOVE_RESULT:
			const newArray = state.results.filter(result => result.id !== action.resId)
			return {
				...state,
				results: newArray
			}
		default: return state
	}
};

export default resultsReducer;