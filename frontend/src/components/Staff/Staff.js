import { useEffect, useState } from 'react'
import { useHistory }  from 'react-router-dom'
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { Button } from '@material-ui/core'
import axios from 'axios'
import nookies from 'nookies'

import styles from '../../assets/styles/Staff.module.css'

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
}));

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

const TablePaginationActions = (props) => {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

const StaffDetail = ({staff, handleDelete, handleSetup}) => {

    const [openWarning, setOpenWarning] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
 
    const handleClose = (e) => {
        setAnchorEl(null)
    }

    const handleOptionClick = () => {
        handleSetup(staff, false)
        handleClose()
    }

    return (
            <StyledTableRow key={staff.id}>
                <StyledTableCell >{staff.id}</StyledTableCell>
                <StyledTableCell align="left">{staff.name}</StyledTableCell>
                <StyledTableCell align="left">{staff.email}</StyledTableCell>
                <StyledTableCell align="left"><MoreVertIcon onClick={(e) => setAnchorEl(e.currentTarget)}/></StyledTableCell>
                <Menu
                    id='staff-menu-actions'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleOptionClick}>Edit</MenuItem>
                    <MenuItem onClick={() => {setOpenWarning(true); handleClose()}}>Delete</MenuItem>
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
                            onClick={() => {handleDelete(staff.id); setOpenWarning(false)}}>
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>    
            </StyledTableRow>
    )
}

const Staff = () => {

    const classes = useStyles()
    const [openCreate, setOpenCreate] = useState(false)
    const [staffName, setStaffName] = useState('')
    const [staffEmail, setStaffEmail] = useState('')
    const [staffId, setStaffId] = useState(-1)
    const [isCreate, setIsCreate] = useState(false)
    const [staffList, setStaffList] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const history = useHistory()
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, staffList.length - page * rowsPerPage)
    useEffect(() => {

        if(!sessionStorage.getItem('user')){
            history.replace('/login')
        }
        getStaff()
    }, [])


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

   

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0);
    };

    const handleCreateUpdateStaff = async () => { // boolean flag create to indicate staff creation or update
        const cookies = nookies.get('jwt_token')
        const endpoint = isCreate ? 'Create' : 'Update'
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
                nookies.set(null, 'jwt_token', data.jwt_token)
            }
            setOpenCreate(false)
            setOpen(false)
            getStaff()
        })
        .catch((error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 403:
                        history.push('./login')
                        break

                    case 404:
                    case 500:
                        setOpen(true)
                        setErrorMessage('Trouble making that change to your staff list. It\'s possible that another staff with that email already exists')
                        break
                }
            }
            setOpenCreate(false)
            getStaff()
        })
    }

    const handleDeleteStaff = async (staffId) => {
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
            setOpenCreate(false)
            getStaff()
        })
        .catch((error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 403:
                        history.push('./login')
                        break

                    case 404:
                    case 500:
                        setOpen(true)
                        setErrorMessage('Trouble removing that staff to your staff list')
                        break
                }
            }
            setOpenCreate(false)
            getStaff()
        })
    }

    const getStaff = async () => {

        const cookies = nookies.get('jwt_token')
        axios.post(`${process.env.REACT_APP_PUBLIC_SERVER_URL}/Api/Restaurant/Staff/Data`, {
            cookies: cookies
        })
        .then((resp) => {
            const statusCode = resp.status
            const data = resp.data
            if (statusCode == 200) {
                setStaffList(data.staff)
                nookies.set(null, 'jwt_token', data.jwt_token)
            }
            setOpenCreate(false)
        })
        .catch((error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 403:
                        history.push('./login')
                        break

                    case 404:
                    case 500:
                        setOpen(true)
                        setErrorMessage('Trouble loading staff data, please try again later')
                        break
                }
            }
            setOpenCreate(false)
        })
    }

    return (
        <div>
            <Paper elevation={3} variant="elevation" className={styles.container}>
            { open && 
                <Alert 
                    variant="filled" 
                    severity="error" 
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {errorMessage}
                </Alert>
            }
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
                    {(rowsPerPage > 0
                        ? staffList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : staffList
                        ).map((staff) => (
                        <StaffDetail staff={staff} handleUpdate={handleCreateUpdateStaff} handleDelete={handleDeleteStaff} handleSetup={prepare}/>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                    <TablePagination 
                        rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} 
                        colSpan={3}
                        count={staffList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'rows per page' },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions} />
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