import React from 'react';

import classes from './Tracker.module.css'

const Tracker = (props) => {
    return (
        <div style={{width:'30%', margin: '20px'}}>
            <div className={classes.Full}>
                <span className={props.stage > 0 ? classes.DotSelected : classes.Dot}></span>
                <hr className={classes.Line}/>
                <span className={props.stage > 1 ? classes.DotSelected : classes.Dot}></span>
                <hr className={classes.Line}/>
                <span className={props.stage > 2 ? classes.DotSelected : classes.Dot}></span>
                <hr className={classes.Line}/>
                <span className={props.stage > 3 ? classes.DotSelected : classes.Dot}></span>
            </div>
            <div className={classes.Text}>
                <p>Confirmed</p>
                <p>Cooking</p>
                <p>Delivering</p>
                <p>Delivered</p>
            </div>
        </div>
    );
};

export default Tracker;