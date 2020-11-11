import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import Navbar from './components/layouts/Navbar'
import Details from './components/pages/Details'

const PrivateRoute = ({ component: Component, ...rest }) => {
	const auth = useSelector(state=>state.ui.auth)
	return (
		<Route {...rest} render={(props) => (
			auth === true
				? <Component {...props} />
				: <Redirect to='/signin' />
		)} />
)}

export const useRoutes = () => {
	return (
		<>
			<Navbar />
				<Route exact path='/signin' component={SignIn} />
				<Route exact path='/signup' component={SignUp} />
			<Switch>
				<PrivateRoute exact path='/details' component={Details} />
			</Switch>
		</>
	)
}
