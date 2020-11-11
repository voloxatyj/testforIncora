import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setErrors } from '../redux/actions/uiActions'
import { setUser } from '../redux/actions/dataActions'

export const useHttp = () => {
	const dispatch = useDispatch()
	const request = useCallback (async (url, method='GET', body=null, headers={}) => {
		try {
				if(body){
					body = JSON.stringify(body)
					headers['Content-Type'] = 'application/json'
				}
				const response = await fetch(url, { method, body, headers })
				const data = await response.json()
				if(data.message){
					dispatch(setErrors(data))
				} else {
					dispatch(setUser(data))
				}
				if(!response.ok) throw new Error(data.messages || 'something goes wrong')
			} catch (error) {
				throw error
			}
		},[])
	return { request }
}