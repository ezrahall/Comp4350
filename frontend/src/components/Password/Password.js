import { useState, useContext } from "react";
import { Avatar, Paper, Fab, Dialog, makeStyles, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';
import styles from './Password.module.css'
import { UserContext } from '../../context/user'


const useStyles = makeStyles({
    root: {
        borderRadius: 20,
        margin: '30px',

    }
})

const Profile = () => {
    const {updateUser} = useContext(UserContext)
    const [open, setOpen] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const classes = useStyles()
    
    const handleUpdate = () => {
        setOpen(false)

        const data = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        updateUser(data)

    }

    const handlePasswordChange = () => {
            
    }

    return (
        <div className={styles.profileDiv}>
            <Paper elevation={3} variant="elevation" className={styles.container}>
                <h1>Reset You Password</h1>
                <p>Enter your old password to confirm the change</p>

                <div>
                    <label>Current Password</label>
                    <TextField value={oldPassword} type="password" onChange={e => setOldPassword(e.target.value)} />

                    <label>New Password</label>
                    <TextField value={newPassword} type="password" onChange={e => setNewPassword(e.target.value)} />
                </div>

                <Button color="primary" variant="contained" classes={classes} onClick={handlePasswordChange}>Change Password</Button>
            </Paper>
        </div>
    )
}

export default Profile