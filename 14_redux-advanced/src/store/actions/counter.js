import {ADD, DECREMENT, INCREMENT, SUBTRACT} from "./actionTypes";

export const increment = () => {
	return {
		type: INCREMENT
	}
}

export const decrement = () => {
	return {
		type: DECREMENT
	}
}

export const add = (value) => {
	return {
		type: ADD,
		val: value
	}
}

export const subtract = (value) => {
	return {
		type: SUBTRACT,
		val: value
	}
}