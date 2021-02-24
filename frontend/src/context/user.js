import React, { createContext, useState } from 'react'
import nookies, {destroyCookie} from 'nookies'
import {useHistory, useLocation} from 'react-router-dom'
import axios from 'axios'
import jquery from 'jquery'

export const UserContext = createContext()

const UserContextProvider = (props) => {

	const [name, setName] = useState('')
    const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [hasError, setHasError] = useState(false)
	const [respMessage, setRespMessage] = useState('')
	const [address, setAddress] = useState('')
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

			console.log(resp);
			const statusCode = resp.status
			console.log(statusCode);
			const data = resp.data
			if (statusCode == 200) {
				setName(data.name)
				setEmail(data.email)
				setPhoneNumber(data.phone)
				setHasError(false)
				setRespMessage('')
				console.log("setting isAuth to true")
				// setCookies(resp.headers)
				console.log("resp headers = ", resp.headers); 
				return true
			}
			if (statusCode ==  403) {
				history.push(from)
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
		console.log("Sign Up", user);
		const restaurantAPI = '/Api/Restaurant/Register'
		const userApi = '/Api/User/Register'
		const endPoint = type ? restaurantAPI : userApi
		console.log("checked is ", type, "endPoint is", endPoint);
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
			if (statusCode == 200) {
				setName(user.name)
				setEmail(user.email)
				setPhoneNumber(user.phone)
				setAddress(user.address)
				setHasError(false)
				console.log("SUccess");
				return true
			}
			if (statusCode ==  403) {
				history.push(from)
			}
		} catch (error) {
			setIsLoading(false)
			setHasError(true)
			setRespMessage('Couldn\'t complete registration process. Please try again later!')
			return false
		}
	}

	const updateUser = async (user) => {
		try {
			console.log("updating user to", user);
			setIsLoading(true)
			const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/User/Update`, {
                name: user.name,
                email: user.email,
				phone: user.phone,
				password: user.password
			})
			setIsLoading(false)
			const statusCode = resp.status
			const data = resp.data
			if (statusCode == 200) {
				setName(user.name)
				setEmail(user.email)
				setPhoneNumber(user.phone)
				setHasError(false)
				setRespMessage('Profile Successfully Updated!')
			}
			
		} catch (error) {
			console.log('error response', error.response);
			setIsLoading(false)
			setHasError(true)
			setRespMessage('Couldn\'t update information. Please try again later!')
			if (error.response.status ==  403) {
				history.push(from)
			}
		}
	}

	const logout = async () => {
		try {
			console.log("logging out user");
			setIsLoading(true)
			axios.defaults.withCredentials = true
			const resp = await axios.get(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Logout`, {withCredentials: true})
			if(resp.status == 200) {
				console.log("Log out successfully");
			}
			setIsLoading(false)
		} catch (error) {
			console.log("Couldn't logout");
		}
	}

	const setCookies = (cookie) => {
		nookies.set("sessionCookie", cookie)
	}

	return (
		<UserContext.Provider value={{name, email, phoneNumber, address, signIn, signUp, hasError, respMessage, isLoading, updateUser, logout}}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContextProvider