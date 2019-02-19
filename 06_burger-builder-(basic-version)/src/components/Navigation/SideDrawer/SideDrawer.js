import React from 'react'

import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = (props) => {


    return (
        <div className={classes.SideDrawer}>
            <Logo height='11%' marginBottom='32px'/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    )
}

export default sideDrawer