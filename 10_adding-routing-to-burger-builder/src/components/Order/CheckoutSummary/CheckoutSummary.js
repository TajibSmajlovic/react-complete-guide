import React from 'react'

import classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes good :)</h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button btnType='Danger' clicked={props.Cancle} >CANCEL</Button>
			<Button btnType='Success' clicked={props.Continue} >CONTINUE</Button>
		</div>
	)
}

export default checkoutSummary