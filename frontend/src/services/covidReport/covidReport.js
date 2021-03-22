import axios from 'axios'
import nookies from 'nookies'

export const reportPositive = (date) => {
    const cookies = nookies.get('jwt_token')
    axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Tracing/Report`, {
        cookies: cookies,
        date: date.toString(),
    })
    .then((resp) => {
        const statusCode = resp.status
        const data = resp.data
        if (statusCode == 200) {
            nookies.set(null, 'jwt_token', data.jwt_token)
        }
    })
    .catch((error) => {
        return null
    })
}
