import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

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

export default CustomDrawer;