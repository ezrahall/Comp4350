import axios from "axios";

export let getOrders = async () => {
    let result = [];
    try {
        let res = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Restaurant/Transaction/Data`, {
            cookies: genCookies(),
            only_active: true,
            offset: 0,
            limit: 20
        })
        result = res.data.orders.filter((order) => order.state >= 0 && order.state <=4 )
        return result
    } catch (e) {
        console.log(e)
        return []
    }
}


export let getOrderCustomer = async () => {
    let res = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/User/Transaction/Data`, {
        cookies: genCookies(),
        id: '',
        offset: 0,
        limit: 30
    })
    return res.data.orders[res.data.orders.length-1]
}
export let getPastOrders = async () => {
    let result = [];
    try {
        let res = await axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Restaurant/Transaction/Data`, {
            cookies: genCookies(),
            only_active: false,
            offset: 0,
            limit: 20
        })
        result = res.data.orders.filter((order) => order.state < 0 || order.state >= 4 )
        return result
    } catch (e) {
        console.log(e)
        return []
    }
}

const genCookies = () => {
    return (
        document.cookie.split(';').map(function(c) {
            return c.trim().split('=').map(decodeURIComponent);
        }).reduce(function(a, b) {
            try {
                a[b[0]] = JSON.parse(b[1]);
            } catch (e) {
                a[b[0]] = b[1];
            }
            return a;
        }, {})
    )
}