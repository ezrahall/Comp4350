import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';

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
  
export default StyledTabs;