import { useState, useContext } from "react";
import { Paper, makeStyles, TextField, Button } from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';
import styles from './Address.module.css'
import { UserContext } from '../../context/user'


const useStyles = makeStyles({
    root: {
        borderRadius: 20,
        margin: '30px',

    }
})

const Profile = () => {
    const {updateUser, address} = useContext(UserContext)
    const [newAddress, setNewAddress] = useState(address)
    const classes = useStyles()
    
    const handleUpdate = () => {

        const data = {
            address: newAddress
        }

        updateUser(data)
    }

    const handleAddressChange = () => {
        
    }

    return (
        <div className={styles.profileDiv}>
            <Paper elevation={3} variant="elevation" className={styles.container}>
                <h1>Change Your Address</h1>
                <p>Enter your old password to confirm the change</p>

                <div>
                    <label>Addess</label>
                    <TextField value={newAddress} type="password" onChange={e => setNewAddress(e.target.value)} />
                </div>

                <Button color="primary" variant="contained" classes={classes} onClick={handleAddressChange}>Update Addess</Button>
            </Paper>
        </div>
    )
}

export default Profile