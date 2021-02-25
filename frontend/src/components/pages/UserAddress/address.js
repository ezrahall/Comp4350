import React, { createContext, useState } from 'react'
import nookies, {destroyCookie} from 'nookies'
import {useHistory, useLocation} from 'react-router-dom'
import axios from 'axios'
//import jquery from 'jquery'

export const AddressContext = createContext()

const AddressContextProvider = (props) => {
    const [addresses, setAddresses] = useState('')
    const [token, setToken] = useState('')
    const [hasError, setHasError] = useState(false)
	const [respMessage, setRespMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
	const location = useLocation()
	const history = useHistory()
	const { from } = location.state || { from: { pathname: "/address" } };

    const enterAddress = async(currAddress,currToken) => {
        console.log("Address: ", addresses);
        try {
            setIsLoading(true)
            const resp = await axios.post(`http://127.0.0.1:5000/Api/User/Autocomplete`, {
                addr: currAddress,
                token: currToken
            })
            setIsLoading(false)
            console.log(resp);
            const statusCode = resp.status
            console.log(statusCode);
            const data = resp.data
            if (statusCode == 200) {
                setAddresses(data.completions)
                setToken(data.token)
                console.log("Resp headers: ", resp.headers);
                return true
            }
        } catch(error) { 
            setIsLoading(false)
            setHasError(true)
            setRespMessage('Error setting address')
            // if(error.response) {
            //     switch (error.response.status) {
            //         case 403: 
            //             setRespMessage('Username or password is incorrect')
            //             break
                        
            //         case 404: 
            //             setRespMessage('Error trying to connect to server, please try again later!')
            //             break

            //         case 500: 
            //             setRespMessage('Oops well that didnt work. How about you try again. Contact us if the problem persists')
            //             break
            //     }
            // }
            
            return false
        }
    }
	const setCookies = (cookie) => {
		nookies.set("sessionCookie", cookie)
	}

	return (
		<AddressContext.Provider value={{addresses, token, hasError, respMessage, isLoading, enterAddress}}>
			{props.children}
		</AddressContext.Provider>
	)
}

export default AddressContextProvider