import * as actionType from '../actions'

const initialState = {
	counter: 0
}

const counterReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.INCREMENT:
			return {
				...state,
				counter: state.counter +1
			}
		case actionType.DECREMENT:
			return {
				...state,
				counter: state.counter -1
			}
		case actionType.ADD:
			return {
				...state,
				counter: state.counter + 10
			}
		case actionType.SUBTRACT:
			return {
				...state,
				counter: state.counter - 7
			}

		default: return state
	}
};

export default counterReducer;