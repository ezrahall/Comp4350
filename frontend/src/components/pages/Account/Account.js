import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CircularProgress, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import nookies from 'nookies'
import axios from 'axios'

import CustomizedTabs from '../../CustomizedTabs/CustomizedTabs'
import Profile from '../../Profile/Profile'
import Password from '../../Password/Password'
import Staff from '../../Staff/Staff'

import {useSelector} from "react-redux";

const Account = (props) => {
    const history = useHistory()

    useEffect(() => {

        if(!sessionStorage.getItem('user')){
            history.replace('/login')
        }
        setIsLoading(true)
        getStaff()
    },[])

    const [openAlert, setOpenAlert] = useState(false)
    const [staffList, setStaffList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const error = useSelector(state => state.user.error)

    const user = {
        tabs : [
            {
                label: 'Profile',
                children: <Profile alertHandler={setOpenAlert} alert={openAlert}/>,
                index: 0,
            },
            {
                label: 'Password',
                children: <Password alertHandler={setOpenAlert} alert={openAlert}/>,
                index: 1,
            }
        ],
        title: "Account Settings"
    }

    const restaurant = {
        tabs : [
            {
                label: 'Profile',
                children: <Profile alertHandler={setOpenAlert} alert={openAlert}/>,
                index: 0,
            },
            {
                label: 'Password',
                children: <Password word alertHandler={setOpenAlert} alert={openAlert}/>,
                index: 1,
            },
            {
                label: 'Staff',
                children: isLoading ? <CircularProgress /> : <Staff staffList={staffList} />,
                index: 2,
            }
        ],
        title: "Restaurant Overview"
    }

    const tabs = sessionStorage.getItem('isOwner') ? restaurant : user

    console.log("sessionStorage value is ",  sessionStorage.getItem('isOwner'));

    console.log('sessionStorage tabs ',  sessionStorage.getItem('isOwner') ? restaurant : user);
        
    const titleCss = {
        margin: 0,
        padding: '60px',
        color: '#fff',
        fontSize: '60px',
    }

    const getStaff = () => {

        const cookies = nookies.get('jwt_token')
        console.log("Getting staff");
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Restaurant/Data`, {
            cookies: cookies
        })
            .then((resp) => {
                const statusCode = resp.status
                const data = resp.data
                if (statusCode == 200) {
                    console.log('data si ', data);
                    setStaffList(data.staff)
                    nookies.set(null, 'jwt_token', data.jwt_token)
                }
                setIsLoading(false)
            })
            .catch((error) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 403:
                            // dispatch(authFail('Oops, looks like the session timed out. Please login again'))
                            history.push('./login')
                            break

                        case 404:
                        case 500:
                            // dispatch(authFail('Oops well that didnt work. How about you try again. Contact us if the problem persists'))
                            break
                    }
                }
                setIsLoading(false)
            })
    }


    return (
        <div>
            <CustomizedTabs tabs={tabs.tabs} title={tabs.title} titleStyles={titleCss} />
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                <Alert severity={error ? "error" : "success"}>
                  {error}
                </Alert> 
            </Snackbar>
        </div>
    )
}

export default Account;