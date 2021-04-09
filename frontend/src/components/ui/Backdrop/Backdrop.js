import React from "react";

import classes from '../../../assets/styles/Backdrop.module.css';

const backdrop = (props) => (
    props.show ?
        <div
            className={classes.Backdrop}
            onClick={() => props.closeModal()}
        ></div> : null
);

export default backdrop;