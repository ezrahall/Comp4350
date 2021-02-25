import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import CustomizedTabs from '../../CustomizedTabs/CustomizedTabs'
import Profile from '../../Profile/Profile'
import Password from '../../Password/Password'
import Address from '../../Address/Address'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import { UserContext } from '../../../context/user'

const Account = (props) => {
    const history = useHistory()

    useEffect(() => {
        if(!sessionStorage.getItem('user')){
            history.replace('/login')
        }
    },[])

    const [openAlert, setOpenAlert] = useState(false)
    const { respMessage, hasError } = useContext(UserContext)

    const tabs = [
        {
            label: 'Profile',
            children: <Profile alertHandler={setOpenAlert} alert={openAlert}/>,
            index: 0,
        },
        {
            label: 'Password',
            children: <Password alertHandler={setOpenAlert} alert={openAlert}/>,
            index: 1,
        },
        {
            label: 'Address',
            children: <Address/>,
            index: 2,
        },
    ]

    const titleCss = {
        margin: 0,
        padding: '60px',
        color: '#fff',
        fontSize: '60px',
    }

    return (
        <div>
            <CustomizedTabs tabs={tabs} title={'Account Settings'} titleStyles={titleCss} />
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                <Alert severity={hasError ? "error" : "success"}>
                  {respMessage}
                </Alert> 
            </Snackbar>
        </div>
    )
}


export default Account