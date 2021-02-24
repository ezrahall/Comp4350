import React, { useContext, useEffect } from 'react'
import CustomizedTabs from '../../CustomizedTabs/CustomizedTabs'
import Profile from '../../Profile/Profile'
import Password from '../../Password/Password'
import Address from '../../Address/Address'
import styles from './Account.module.css'

const Account = (props) => {

    const tabs = [
        {
            label: 'Profile',
            children: <Profile />,
            index: 0,
        },
        {
            label: 'Password',
            children: <Password />,
            index: 1,
        },
        {
            label: 'Address',
            children: <Address />,
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
        </div>
    )
}


export default Account