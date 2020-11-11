import { SET_ERRORS } from './types'
 
export const setErrors = ({errors, message}) => dispatch => {
	dispatch({ 
		type: SET_ERRORS,
		payload: {errors, message}
	}) 
}