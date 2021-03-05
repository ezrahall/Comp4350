import { useState, useContext } from "react";
import { Paper, makeStyles, TextField, Button } from "@material-ui/core"

import styles from '../styles/Password.module.css'
import {updateUser} from '../../store/actions/user';
import {useDispatch} from "react-redux";


const useStyles = makeStyles({
    root: {
        borderRadius: 20,
        margin: '30px',
    }
})

const Password = ({alertHandler}) => {
    const [open, setOpen] = useState(false)
    // const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const classes = useStyles()
    const dispatch = useDispatch();
    
    const handleUpdate = () => {
        setOpen(false)
        const oldUser = JSON.parse(sessionStorage.getItem('user'))
        const data = {
            name: oldUser.name,
            email: oldUser.email,
            address: oldUser.address,
            phone: oldUser.phone === undefined ? '' : oldUser.phone,
            password: newPassword,
        }
        dispatch(updateUser(data))
        alertHandler(true)
    }

    return (
        <div className={styles.profileDiv}>
            <Paper elevation={3} variant="elevation" className={styles.container}>
                <h1 className={styles.header}>Reset You Password</h1>
                <p>Enter your old password to confirm the change</p>

                <div>
                    <label className={styles.label}><span>New Password</span></label>
                    <TextField className={styles.input} value={newPassword} type="password" variant="outlined" onChange={e => setNewPassword(e.target.value)} />
                </div>

                <Button color="primary" variant="contained" classes={classes} onClick={handleUpdate}>Change Password</Button>
            </Paper>
        </div>
    )
}

export default Password