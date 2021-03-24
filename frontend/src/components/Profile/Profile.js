import { useState, useEffect } from "react";
import { Avatar, Paper, Fab, Dialog, makeStyles, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import {useDispatch} from "react-redux";

import styles from '../../assets/styles/Profile.module.css';
import {logOut, updateUser} from '../../store/actions/user';

const useStyles = makeStyles({
    root: {
        width: '100px',
        height: '100px',
    },
})

const Profile = ({alertHandler}) => {
    const history = useHistory()
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [open, setOpen] = useState(false)
    const [fullName, setFullName] = useState(name)
    const [newEmail, setNewEmail] = useState(email)
    const [newPhone, setNewPhone] = useState(phoneNumber)
    const classes = useStyles()
    
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        if(user) {
            setName(user.name)
            setEmail(user.email)
            setPhoneNumber(user.phone)
        } else {
            history.replace('/login')
        }
    }, [])

    const handleEdit = () => {
        setFullName(name)
        setNewEmail(email)
        setNewPhone(phoneNumber)
        setOpen(true)
    }
    
    const handleClose = () => {
        setFullName(name)
        setNewEmail(email)
        setNewPhone(phoneNumber)
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

        dispatch(updateUser(data))
        alertHandler(true)
        setName(data.name)
        setEmail(data.email)
        setPhoneNumber(data.phone)
        history.push('./account')
    }

    const handleLogout = () => {
        dispatch(logOut())
        history.push('./login')
    }

    return (
        <div className={styles.profileDiv}>
            <Paper elevation={3} variant="elevation" className={styles.container}>
            <h1 className={styles.header}>Profile Information</h1>
                <div className={styles.imgContainer}>
                    <Avatar classes={classes} src="../../assets/images/avatar.png" />
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.infoDiv}>
                        <label className={styles.label}><span>Account Name</span></label>
                        <TextField value={name} variant='outlined'/>
                    </div>
                    <div className={styles.infoDiv}>
                        <label className={styles.label}><span>Phone Number</span></label>
                        <TextField value={phoneNumber} variant='outlined'/>
                    </div>
                    <div className={styles.infoDiv}>
                        <label className={styles.label}><span>Email Address</span></label>
                        <TextField value={email} variant='outlined'/>
                    </div>
                </div>
                <div className={styles.editDiv}>
                        <Fab color="primary" aria-label="edit" variant="extended" onClick={handleEdit} className={styles.editBtn}>
                            <EditIcon />
                            Edit
                        </Fab>
                    </div>
                <Button onClick={handleLogout} variant="contained" className={styles.logoutBtn}>
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

export default Profile;