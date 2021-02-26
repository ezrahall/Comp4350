import axios from 'axios';

export const getRestaurants = async (distance, filter, address) => {
    console.log(address)
    console.log(address?.split(',')[0])
    try {
        const res = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Search`, {
            'addr': address?.split(',')[0],
            'dist': distance,
            'query': filter,
            'offset': 0,
            'limit': 6
        })
        return res.data.restaurants
    } catch (e){
        console.log(e)
        return []
    }
}

export const addRestaurants = async (offset, distance, filter, address) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Search`, {
            'addr': address?.split(',')[0],
            'dist': distance,
            'query': filter,
            'offset': offset,
            'limit': 6
        })
        return res.data.restaurants
    } catch (e){
        console.log(e)
        return []
    }
}