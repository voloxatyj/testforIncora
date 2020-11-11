import { SET_AUTH, SET_ERRORS, CLEAR_ERRORS } from "../actions/types"

const initialState = {
	auth : false,
	errors: {
		email: null,
		password: null,
		firstName: null,
		lastName: null 
	},
	message: null
}

export default function(state=initialState, action) {
	switch (action.type) {
		case SET_AUTH:
			return {
				...state,
				auth: true
			}
		case SET_ERRORS:
			action.payload.errors.forEach(item=>state.errors[item.param]=item.msg)
			return {
				...state,
				message: action.payload.message
			}
		case CLEAR_ERRORS:
			return {
				...state,
				errors: {
					email: null,
					password: null,
					firstName: null,
					lastName: null 
				},
				message: null
			}
		default: 
			return state
	}
}