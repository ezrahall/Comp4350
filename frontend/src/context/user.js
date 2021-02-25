import React, { createContext, useState } from 'react'
import nookies from 'nookies'
import {useHistory, useLocation} from 'react-router-dom'
import axios from 'axios'

export const UserContext = createContext()

const UserContextProvider = (props) => {

	const [hasError, setHasError] = useState(false)
	const [respMessage, setRespMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const location = useLocation()
	const history = useHistory()

	const { from } = location.state || { from: { pathname: "/login" } };
	

	const signIn = async (user) => {
		console.log("Sign In", user);
		try {
			setIsLoading(true)
			const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/User/Login`, {
                password: user.password,
				email: user.email,
			})
			setIsLoading(false)

			const statusCode = resp.status
			const data = resp.data
			if (statusCode == 200) {
				const user = {
					name: data.name,
					email: data.email,
					phone: data.phone,
					address: data.address
				}
				const stringUser = JSON.stringify(user)
				console.log("Storing user in session ", stringUser);
				sessionStorage.setItem("user", stringUser)
				setHasError(false)
				setRespMessage('')
				nookies.set(null, 'jwt_token', data.jwt_token)
				return true
			}
		} catch (error) {
			setIsLoading(false)
			setHasError(true)
			if(error.response) {
				switch (error.response.status) {
					case 403: 
						setRespMessage('Username or password is incorrect')
						break
						
					case 404: 
						setRespMessage('Error trying to connect to server, please try again later!')
						break

					case 500: 
						setRespMessage('Oops well that didnt work. How about you try again. Contact us if the problem persists')
						break
				}
			}
			return false
		}
	}

	const signUp = async (user, type) => {
		const restaurantAPI = '/Api/Restaurant/Register'
		const userApi = '/Api/User/Register'
		const endPoint = type ? restaurantAPI : userApi
		try {
			setIsLoading(true)
			const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL + endPoint}`, {
                password: user.password,
                email: user.email,
				name: user.name,
				addr: user.address
			})
			setIsLoading(false)
			const statusCode = resp.status
			const data = resp.data
			if (statusCode == 200) {
				sessionStorage.setItem("user", JSON.stringify(user))
				setHasError(false)
				nookies.set(null, 'jwt_token', data.jwt_token)
				return true
			}
		} catch (error) {
			setIsLoading(false)
			setHasError(true)
			if(error.response) {
				switch (error.response.status) {
					case 403: 
						setRespMessage('An account with that email already exists')
						break
						
					case 404: 
						setRespMessage('Error trying to connect to server, please try again later!')
						break

					case 500: 
						setRespMessage('Oops looks like there was a problem. Please try again later')
						break
				}
			}
			return false
		}
	}

	const updateUser = async (user) => {
		try {
			setIsLoading(true)
			console.log("got", user);
			const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/User/Update`, {
                name: user.name,
                email: user.email,
				phone: user.phone,
				password: user.password,
				cookies: genCookies(),
			},
			{
				withCredentials: true
			})
			setIsLoading(false)
			const statusCode = resp.status
			const data = resp.data
			const oldUser = JSON.parse(sessionStorage.getItem('user'))
			if (statusCode == 200) {
				const newUserDetails = {
					name: user.name === '' ? oldUser.name : user.name,
					email: user.email === '' ? oldUser.email : user.email,
					phone: user.phone === '' ? oldUser.phone : user.phone,
					address: user.address,
				}
				console.log("Saving this to session now", JSON.stringify(newUserDetails));
				sessionStorage.setItem("user", JSON.stringify(newUserDetails))
				setHasError(false)
				setRespMessage('Update Successful')
			}
			console.log("Successfully updated");
		} catch (error) {
			console.log('error response', error.response);
			setIsLoading(false)
			setHasError(true)
			if(error.response) {
				
				switch (error.response.status) {
					case 403: 
						history.push(from)
						setRespMessage('Session expired, please sign in again')
						break
						
					case 404: 
						setRespMessage('Error trying to connect to server, please try again later!')
						break

					case 500: 
						setRespMessage('Oops looks like there was a problem. Please try again later')
						break
				}
			}		
		}
	}

	const logout = async () => {
		nookies.destroy(null, "jwt_token")
		sessionStorage.removeItem('user')
		history.push(from)
	}

	const genCookies = () => {

		return (
			document.cookie.split(';').map(function(c) {
			return c.trim().split('=').map(decodeURIComponent);
		  }).reduce(function(a, b) {
			try {
			  a[b[0]] = JSON.parse(b[1]);
			} catch (e) {
			  a[b[0]] = b[1];
			}
			return a;
		  }, {})
		)
	}

	return (
		<UserContext.Provider value={{signIn, signUp, hasError, respMessage, isLoading, updateUser, logout, genCookies}}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContextProvider