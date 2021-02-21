import React, { createContext, useState } from 'react'
import nookies, {destroyCookie} from 'nookies'
import axios from 'axios'

export const UserContext = createContext()

const UserContextProvider = (props) => {

	const [name, setName] = useState('')
    const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isAuth, setIsAuth] = useState(false) // Remember to change this for handling sessions
	const [address, setAddress] = useState('')

	const signIn = async (user) => {
		console.log("Sign In");
		try {
			const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/User/Login`, {
                password: user.password,
                email: user.email,
			})

			console.log(resp);
			const statusCode = resp.status
			console.log(statusCode);
			const data = resp.data
			if (statusCode == 200) {
				setName(data.name)
				setEmail(data.email)
				setPhoneNumber(data.phone)
				setHasError(false)
				setErrorMessage('')
				setIsAuth(true)
				console.log("setting isAuth to true")
			}
		} catch (error) {
			setIsAuth(false)
			setHasError(true)
			setErrorMessage('Username or password is incorrect')
		}
	}

	const signUp = async (user) => {
		console.log("Sign Up", user);
		try {
			const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/User/Register`, {
                password: user.password,
                email: user.email,
                name: user.firstName
			})
			
			const statusCode = resp.status
			const data = resp.data
			if (statusCode == 200) {
				setName(data.name)
				setEmail(data.email)
				setPhoneNumber(data.phone)
				setHasError(false)
				setErrorMessage('')
			}
		} catch (error) {
			setHasError(true)
			setErrorMessage('')
			setIsAuth(false)
		}
	}

	return (
		<UserContext.Provider value={{name, email, phoneNumber, signIn, signUp, hasError, errorMessage, isAuth, setIsAuth}}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContextProvider