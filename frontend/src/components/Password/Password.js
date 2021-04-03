import {useState} from 'react';
import { Paper, makeStyles, TextField, Button } from '@material-ui/core'
import {useDispatch} from 'react-redux';

import styles from '../../assets/styles/Password.module.css'
import {updateUser} from '../../store/actions/user';

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
        <div className={styles.profile__div}>
            <Paper elevation={3} variant='elevation' className={styles.container}>
                <h1 className={styles.header}>Reset You Password</h1>
                <div>
                    <TextField className={styles.input} label={'New Password'} value={newPassword} type='password' variant='outlined' onChange={e => setNewPassword(e.target.value)} />
                </div>
                <Button color='primary' variant='contained' classes={classes} onClick={handleUpdate}>Change Password</Button>
            </Paper>
        </div>
    )
}

export default Password