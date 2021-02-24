import { useState, useContext } from "react";
import { Avatar, Paper, Fab, Dialog, makeStyles, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';
import styles from './Profile.module.css'
import { UserContext } from '../../context/user'


const useStyles = makeStyles({
    root: {
        borderRadius: 20,
    }
})

const Profile = () => {
    const {name, email, phoneNumber, address, updateUser, logout} = useContext(UserContext)
    const [open, setOpen] = useState(false)
    const [fullName, setFullName] = useState(name)
    const [newEmail, setNewEmail] = useState(email)
    const [newPhone, setNewPhone] = useState(phoneNumber)
    const [newAddress, setNewAddress] = useState(address)
    const classes = useStyles()
    


    const handleEdit = () => {
        setFullName(name)
        setNewEmail(email)
        setNewPhone(phoneNumber)
        setNewAddress(address)
        setOpen(true)
    }
    
    const handleClose = () => {
        setFullName(name)
        setNewEmail(email)
        setNewPhone(phoneNumber)
        setNewAddress(address)
        setOpen(false)
    }

    const handleUpdate = () => {
        setOpen(false)

        const data = {
            name: fullName,
            email: newEmail,
            phone: newPhone,
            password: '' // We don't want to update password on this screen
        }

        updateUser(data)
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className={styles.profileDiv}>
            <Paper elevation={3} variant="elevation" className={styles.container}>
                <div className={styles.imgContainer}>
                    <Avatar src="../../styles/images/avatar.png" className={styles.avatar}/>
                </div>
                { name && <h1>{name}</h1>}
                { phoneNumber && <p>{phoneNumber}</p>}
                { email&& <p>{email}</p>}
                { address && <p>{address}</p>}
                <Fab color="primary" aria-label="edit" variant="extended" onClick={handleEdit}>
                    <EditIcon />
                    Edit
                </Fab>
                <Button onClick={handleLogout} color="primary" variant="contained">
                        Logout
                    </Button>
            </Paper>
            <Dialog  fullWidth={true} maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Accouont Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form noValidate autoComplete="off">
                            <div>
                                <label>Name</label>
                                <TextField value={fullName} fullWidth onChange={e => setFullName(e.target.value)} />
                                <label>Pone Number</label>
                                <TextField value={newPhone} fullWidth onChange={e => setNewPhone(e.target.value)} />
                                <label>Email Address</label>
                                <TextField value={newEmail} fullWidth onChange={e => setNewEmail(e.target.value)} />
                                { address && <label>Address</label>}
                                { address && <TextField value={newAddress} fullWidth onChange={e => setNewAddress(e.target.value)} />}
                            </div>
                        </form> 
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={styles.actionBtns}>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        Cancel
                    </Button>
                        <Button onClick={handleUpdate} color="primary" variant="contained">
                        Update
                    </Button> 
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Profile