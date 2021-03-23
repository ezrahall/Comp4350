import React, {Component} from "react";

import classes from './OpenModal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class OpenModal extends Component{

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    render(){
        return(
            <div>
                <Backdrop
                    show={this.props.show}
                    closeModal={this.props.closeModal}
                />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    <div className={classes.Body}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    };
};

export default OpenModal;