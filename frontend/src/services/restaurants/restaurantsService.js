import axios from 'axios';

export let getRestaurants = async (distance, filter, address) => {
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

export let addRestaurants = async (offset, distance, filter, address) => {
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