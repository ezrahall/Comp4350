import React from "react";

import classes from '../../../assets/styles/Spinner.module.css';

const spinner = () => (
    <div className={classes.Spinner}>
        Spinner
        <div className={classes.LdsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default spinner;