import React, { createContext, useState } from 'react'
import axios from 'axios'

export const AddressContext = createContext()

const AddressContextProvider = (props) => {
    const [addresses, setAddresses] = useState([])
    const [token, setToken] = useState('')
    const [hasError, setHasError] = useState(false)
	const [respMessage, setRespMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const enterAddress = async(currAddress,currToken) => {
        try {
            setIsLoading(true)
            const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Search/Autocomplete`, {
                addr: currAddress,
                token: currToken
            })
            setIsLoading(false)
            const statusCode = resp.status
            const data = resp.data
            if (statusCode == 200) {
                setAddresses(data.completions)
                setToken(data.token)
                return true
            }
        } catch(error) { 
            setIsLoading(false)
            setHasError(true)
            setRespMessage('Error setting address')     
            return false
        }
    }

	return (
		<AddressContext.Provider value={{addresses, token, hasError, respMessage, isLoading, enterAddress}}>
			{props.children}
		</AddressContext.Provider>
	)
}

export default AddressContextProvider