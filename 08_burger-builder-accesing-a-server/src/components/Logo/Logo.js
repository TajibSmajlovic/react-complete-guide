import React from 'react'

import classes from './Logo.module.css'
import burgerLogo from '../../assets/images/132 burger-logo.png'

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height, marginBottom: props.marginBottom}}>
        <img src={burgerLogo} alt="myBurger"/>
    </div>
)

export default logo