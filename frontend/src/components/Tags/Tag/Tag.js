import React from 'react';

import classes from './Tag.module.css'

const Tag = (props) => {

    return (
        <div className={classes.BlurDiv}>
            <div className={classes.Tag} onClick={() => props.selectItem(props.name)}>
                <p>{props.name}</p>
                <div className={classes.Blur}></div>
                <img src={props.img} alt={props.name}/>
            </div>
        </div>
    );
};

export default Tag;