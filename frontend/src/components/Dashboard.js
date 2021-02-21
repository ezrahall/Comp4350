import React, { useContext } from 'react'
import { UserContext } from '../context/user'

const Dashboard = (props) => {

    const {name, email, phoneNumber} = useContext(UserContext)


    return (
        <div>
            <h1>{name}'s Profile</h1>
        </div>
    )
}

export default Dashboard