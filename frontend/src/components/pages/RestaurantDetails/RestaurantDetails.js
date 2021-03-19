import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';
import RestaurantMenu from '../RestaurantMenu/RestaurantMenu'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Tags from '../../Tags/Tags';
import Staff from '../../Staff/Staff';
import Dashboard from '../../Dashboard/Dashboard';
import { logOut } from '../../../store/actions/user';


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
  const [auth, setAuth] = useState(sessionStorage.getItem('user'))
  const [currentTab, setCurrentTab] = useState({
          text:'Dashboard',
          icon: <DashboardIcon />,
          component: <Dashboard />
      })

  const open = Boolean(anchorEl)

  const tabs = [
          {
              text:'Dashboard',
              icon: <DashboardIcon />,
              component: <Dashboard />
          },
          {
              text:'Menu',
              icon: <RestaurantMenuIcon />,
              component: <RestaurantMenu />
          },
          {
              text:'Tags',
              icon: <LoyaltyIcon />,
              component: <Dashboard /> 
          },
          {
              text:'Order',
              icon: <ListAltIcon />,
              component: <Dashboard /> 
          },
          {
              text:'Staff',
              icon: <PeopleIcon />,
              component: <Staff /> 
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
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" noWrap style={{flexGrow: 1}}>
                  {currentTab.text}
                </Typography>
                {auth && (
            <div>
              <IconButton
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
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
            <CustomDrawer tabs={tabs} handleTabChange={handleTabChange} />
            <main className={classes.content}>
              {currentTab.component}
            </main>
        </div>
    )
}

const CustomDrawer = ({tabs, handleTabChange}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {tabs.map((tab) => (
              <ListItem button key={tab.text} onClick={() => handleTabChange(tab)}>
                <ListItemIcon>{tab.icon}</ListItemIcon>
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