import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import PeopleIcon from '@material-ui/icons/People';
import AssessmentIcon from '@material-ui/icons/Assessment';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Staff from '../../Staff/Staff';
import { logOut } from '../../../store/actions/user';
import { blueGrey } from '@material-ui/core/colors';
import CovidReport from '../CovidReport/CovidReport';
import RestaurantTags from '../../RestaurantTags/RestaurantTags';
import ManageOrders from '../Orders/ManageOrders/ManageOrders';
import ManagePastOrders from '../Orders/ManagePastOrders/ManagePastOrders';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'hidden',
    },
    content: {
      flexGrow: 1,
      left: drawerWidth,
      marginLeft: drawerWidth,
      padding: theme.spacing(3),
      paddingTop: theme.spacing(10),
      
    },
    selected: {
      backgroundColor: blueGrey[900],
      color: '#fff',
      '&:hover': {
        backgroundColor: blueGrey[900],
      }
    }
  }));

const RestaurantDetails = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    if(!sessionStorage.getItem('user')){
        history.replace('/login')
    }
  }, [])

  const classes = useStyles()
  const history = useHistory()  
  const [anchorEl, setAnchorEl] = useState(null);
  const [auth, setAuth] = useState(JSON.parse(sessionStorage.getItem('user')))
  const [currentTab, setCurrentTab] = useState({
    text:'Staff',
    icon: <PeopleIcon />,
    component: <Staff /> 
})

  const open = Boolean(anchorEl)

  // Add new tabs for restaurants here by adding a new object in the array with
  // a text  field which is the field to be displayed on the navbar
  // an icon field which is the icon to be displayed for that that tab. 
  // visit https://material-ui.com/components/material-icons/ and search for an icon that best
  // describes your field name. the simply add the import and add it to the icon field
  // then finally the component to be rendered for that tab in the component field 

  const tabs = [
          {
            text:'Staff',
            icon: <PeopleIcon />,
            component: <Staff /> 
          },
            {
                text: 'Current Orders',
                icon: <PeopleIcon/>,
                component: <ManageOrders/>
            },
          {
              text: 'Past Orders',
              icon: <PeopleIcon/>,
              component: <ManagePastOrders/>
          },
          {
            text:'Tags',
            icon: <LoyaltyIcon />,
            component: <RestaurantTags /> 
          },
          {
            text:'Reports',
            icon: <AssessmentIcon />,
            component: <CovidReport /> 
          }
        ]

      const handleTabChange = (tab) => {
        setCurrentTab(tab)
      }

      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      }

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleLogout = () => {
        dispatch(logOut())
        history.push('./login')
    }

    return (
        <div>
            <AppBar position='fixed' className={classes.appBar}>
              <Toolbar>
                <Typography variant='h6' noWrap style={{flexGrow: 1}}>
                  {currentTab.text}
                </Typography>
                {auth && (
                <div>
                    {auth.name}
                  <IconButton
                    onClick={handleMenu}
                    color='inherit'
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div> )}
              </Toolbar>
            </AppBar>
            <CustomDrawer tabs={tabs} handleTabChange={handleTabChange} selectedTab={currentTab} />
            <main className={classes.content}>
              {currentTab.component}
            </main>
        </div>
    )
}

const CustomDrawer = ({tabs, handleTabChange, selectedTab}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {tabs.map((tab) => (
              <ListItem button key={tab.text} onClick={() => handleTabChange(tab)}  className={selectedTab.text === tab.text ? classes.selected : ''}>
                <ListItemIcon >{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.text} />
              </ListItem>
            ))}
          </List>          
        </div>
      </Drawer>
    </div>
  );
}

export default RestaurantDetails;