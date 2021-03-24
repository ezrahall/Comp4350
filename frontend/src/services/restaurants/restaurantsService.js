import axios from 'axios';
import {genCookies} from "../genCookies";

export let getRestaurants = async (distance, filter, address) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Search`, {
            'addr': address?.split(',')[0],
            'dist': distance,
            'query': filter,
            'offset': 0,
            'limit': 6
        })
        console.log(res.data.restaurants[0])
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

export const getRestaurantMenu = async (id) =>{
    const result = [];
    let count = 0
    try{
        const res = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Menu/${id}`, {
            cookies: genCookies()
        })
        res.data.menu.forEach((item) => {
            result.push({...item, id:count});
            count++;
        })
        console.log(result)
        return result
    }catch (e){
        console.log(e)
    }
}
