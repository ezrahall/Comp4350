import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import StyledTabs from './StyledTabs'
import StyledTab from './StyledTab'
import TabPanel from './TabPanel'

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
  const history = useHistory()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  }

  const handleClick = () => {
    history.goBack()
  }

  return (
    <div className={classes.root}>
      <div className={classes.color}>
        <Button style={{background: 'transparent', float: 'left', color: '#fff'}} onClick={handleClick}> <ArrowBackIcon/> </Button>
        <h1 style={props.titleStyles}>{props.title}</h1>
        <StyledTabs value={value} onChange={handleChange} aria-label='styled tabs example'  barColor={props.barColor}>
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