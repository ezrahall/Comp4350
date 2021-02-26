import React from "react";

import classes from './Spinner.module.css';

const spinner = () => (
    <div className={classes.Spinner}>
        <div className={classes.LdsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default spinner;