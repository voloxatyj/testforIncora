import React from 'react'
import { useSelector } from 'react-redux'

export default function Details() {
	const user = useSelector(state=>state.data.user)
	return (
		<div className="container"> 
			<h1>Hi!! {user.firstName+' '+user.lastName}</h1>
			<h3>Gontratulations you in!!</h3>
		</div>
	)
}