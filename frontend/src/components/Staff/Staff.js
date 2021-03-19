import axios from 'axios'
import nookies from 'nookies'
import { useEffect, useState } from 'react'
import { useHistory }  from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Avatar, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from '../../assets/styles/Staff.module.css'
import { Button, TableFooter, TablePagination } from '@material-ui/core'


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#3f51b5',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

const StaffDetail = ({staff, handleDelete, handleSetup}) => {

    const [open, setOpen] = useState(false)
    const [openWarning, setOpenWarning] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
 
    const handleClose = (e) => {
        setOpen(false)
        setAnchorEl(null)
    }

    const handleOptionClick = () => {
        handleSetup(staff, false)
    }

    return (
            <StyledTableRow key={staff.id}>
                <StyledTableCell >{staff.id}</StyledTableCell>
                <StyledTableCell align="left">{staff.name}</StyledTableCell>
                <StyledTableCell align="left">{staff.email}</StyledTableCell>
                <StyledTableCell align="left"><MoreVertIcon onClick={(e) => setAnchorEl(e.currentTarget)}/></StyledTableCell>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                    <MenuItem onClick={handleOptionClick}>Edit</MenuItem>
                    <MenuItem onClick={() => setOpenWarning(true)}>Delete</MenuItem>
                </Menu>
                <Dialog
                    open={openWarning}
                    keepMounted
                    onClose={() => setOpenWarning(false)}
                    fullWidth
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle id="alert-dialog-slide-title">Warning!</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <p>You are about to remove {staff.name} from your staff list. This step cannot be reversed</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenWarning(false)} color="primary">
                            Cancel
                        </Button>
                        <Button 
                            color="primary"
                            variant="contained"
                            onClick={() => handleDelete(staff.id)}>
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>    
            </StyledTableRow>
    )
}

const Staff = () => {

    useEffect(() => {

        if(!sessionStorage.getItem('user')){
            history.replace('/login')
        }
        setIsLoading(true)
        getStaff()
      }, [])

    const classes = useStyles()
    const [openCreate, setOpenCreate] = useState(false)
    const [staffName, setStaffName] = useState('')
    const [staffEmail, setStaffEmail] = useState('')
    const [staffId, setStaffId] = useState(-1)
    const [isCreate, setIsCreate] = useState(false)
    const [staffList, setStaffList] = useState([])
    const [isLoadingm, setIsLoading] = useState(false)
    const history = useHistory()

    const handleCreateUpdateStaff = () => { // boolean flag create to indicate staff creation or update
        const cookies = nookies.get('jwt_token')
        const endpoint = isCreate ? 'Create' : 'Update'
        console.log("about to create",staffEmail, staffName);
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Restaurant/${endpoint}/Staff`, {
            cookies: cookies,
            id: staffId,
            name: staffName,
            email: staffEmail
        })
            .then((resp) => {
                const statusCode = resp.status
                const data = resp.data
                if (statusCode == 200) {
                    console.log('data si ', data);
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

    const prepare = (staff, create) => {
        if(staff) {
            setStaffName(staff.name)
            setStaffEmail(staff.email)
            setStaffId(staff.id)
        }
        setOpenCreate(true)
        setIsCreate(create)
    }

    const handleCancel = () => {
        setStaffName('')
        setStaffEmail('')
        setStaffId(-1)
        setOpenCreate(false)
    }

    const handleDeleteStaff = (staffId) => {
        const cookies = nookies.get('jwt_token')
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Restaurant/Delete/Staff`, {
            cookies: cookies,
            id: staffId,
        })
            .then((resp) => {
                const statusCode = resp.status
                const data = resp.data
                if (statusCode == 200) {
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
            <Paper elevation={3} variant="elevation" className={styles.container}>
                <Button variant="contained" color="primary" style={{float: 'right', marginBottom: '10px'}} onClick={() => prepare(null, true)}>Add New Staff Member</Button>
            { staffList.length > 0 ? <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Email</StyledTableCell>
                        <StyledTableCell align="left">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {staffList.map((staff) => (
                        <StaffDetail staff={staff} handleUpdate={handleCreateUpdateStaff} handleDelete={handleDeleteStaff} handleSetup={prepare}/>
                    ))}
                    </TableBody>
                    <TableFooter>
                    <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
                    </TableFooter>
                </Table> : 
                <h1>No Staff</h1>
                }
            </Paper>
            <Dialog  fullWidth={true} maxWidth="sm" open={openCreate} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Staff Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form noValidate autoComplete="off">
                            <div>
                                <label>Name</label>
                                <TextField value={staffName} fullWidth onChange={e => setStaffName(e.target.value)} />
                                <label>Email Address</label>
                                <TextField value={staffEmail} fullWidth onChange={e => setStaffEmail(e.target.value)} />
                            </div>
                        </form> 
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={styles.actionBtns}>
                    <Button onClick={handleCancel} color="secondary" variant="contained">
                        Cancel
                    </Button>
                        <Button onClick={() => handleCreateUpdateStaff(true)} color="primary" variant="contained">
                        {isCreate ? 'Create' : 'Update'}
                    </Button> 
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Staff