import { useState } from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 300,
      width: '100%',
      backgroundColor: '#6faaf7',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    margin: 'auto',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  color: {
    background: 'linear-gradient(90deg, #ff006a 0%, #bf00ff 100%)',
  },
}));

const CustomizedTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <div className={classes.color}>
        <h1 style={props.titleStyles}>{props.title}</h1>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example"  barColor={props.barColor}>
            {props.tabs.map((tab) => {return <StyledTab label={tab.label} style={{margin: tab.css }}/>})}
        </StyledTabs>
      </div>
      <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
          {props.tabs.map((tab) => {return (<TabPanel value={value} index={tab.index} dir={theme.direction}>{tab.children}</TabPanel>)})}
      </SwipeableViews>
    </div>
  );
}

export default CustomizedTabs