import  { CLEAR_ERRORS, SET_USER, SET_AUTH } from './types'

export const setUser = ({firstName, lastName, token}) => dispatch => {
	dispatch({
		type: SET_USER,
		payload: {firstName, lastName} 
	}) 
	dispatch({type: CLEAR_ERRORS})
	dispatch({type: SET_AUTH})
	localStorage.setItem('token', token)
	localStorage.setItem('userData', JSON.stringify({firstName, lastName}))
}