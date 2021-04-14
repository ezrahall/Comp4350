import React from 'react'
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

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
  
export default StyledTab;