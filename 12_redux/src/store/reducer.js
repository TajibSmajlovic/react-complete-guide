/*
import * as actionType from './actions'

const initialState = {
    counter: 0,
	results: []
}

const reducer = (state = initialState, action) => {
/!*  /!*  if (action.type === 'INCREMENT') {
        return {
            counter: state.counter + 1
        }
    }
	if (action.type === 'DECREMENT') {
		return {
			counter: state.counter - 1
		}
	}
	if (action.type === 'ADD') {
		return {
			counter: state.counter + action.value
		}
	}
	if (action.type === 'SUBTRACT') {
		return {
			counter: state.counter - action.value
		}
	}*!/
    return state;*!/

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
		case actionType.STORE_RESULT:
			return {
				...state,
				results: state.results.concat({id:  new Date(), value: state.counter})
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

export default reducer;*/
