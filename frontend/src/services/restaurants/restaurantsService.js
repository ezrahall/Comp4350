import axios from 'axios';

export const getRestaurants = async (distance) => {
    try {
        const res = await axios.post('http://127.0.0.1:5000/Api/Search', {
            'addr': '374 Windflower Rd',
            'dist': distance,
            'query': '',
            'offset': 0,
            'limit': 6
        })
        return res.data.restaurants
        // return res.data.restaurants.sort((a,b) =>{
        //     if (a.name < b.name){
        //         return -1
        //     }
        //     if (a.name > b.name){
        //         return 1
        //     }
        //     return 0
        // })
    } catch (e){
        console.log(e)
        return null
    }
}

export const addRestaurants = async (offset, distance) => {
    try {
        const res = await axios.post('http://127.0.0.1:5000/Api/Search', {
            'addr': '374 Windflower Rd',
            'dist': distance,
            'query': '',
            'offset': offset,
            'limit': 6
        })
        return res.data.restaurants
    } catch (e){
        console.log(e)
    }
}