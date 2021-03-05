import axios from "axios";

export const enterAddress = async(currAddress,currToken) => {
    try {
        const resp = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Search/Autocomplete`, {
            addr: currAddress,
            token: currToken
        })
        const statusCode = resp.status
        const data = resp.data
        if (statusCode == 200) {
            return  {
                addresses: data.completions,
                token: data.token
            }

        }
    } catch(error) {
        return null
    }
}