import axios from 'axios';

export const getRestaurants = async (distance, filter) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Search`, {
            'addr': '374 Windflower Rd',
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

export const addRestaurants = async (offset, distance, filter) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Search`, {
            'addr': '374 Windflower Rd',
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