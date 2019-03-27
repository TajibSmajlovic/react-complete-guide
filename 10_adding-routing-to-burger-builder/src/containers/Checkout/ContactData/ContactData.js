import React, {Component} from 'react'

import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault()

		  this.setState({loading: true})
	const order = {
		ingredients: this.props.ingredients,
		price: this.props.price,
		customer: {
			name: 'Tajib Smajlović',
			address: {
				street: 'TestStreet123',
				zipCode: '659742',
				country: 'Bosnia and Herzegovina'
			},
			email: 'test@test.com'
		},
		deliveryMethod: 'fastest'
	}

	// alert('You CONTINUE!')
	axios.post('/orders.json', order).then(response => {
		this.setState({loading: false})
		this.props.history.push('/')
	}).catch(error => {
		this.setState({loading: false})
	})
	}

	render () {
		let form = (
			<form>
				<input className={styles.Input} type="text" name='name' placeholder='Your Name'/>
				<input className={styles.Input} type="email" name='email' placeholder='Your e-Mail'/>
				<input className={styles.Input} type="text" name='street' placeholder='Street'/>
				<input className={styles.Input} type="text" name='postal' placeholder='Postal Code'/>
				<Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
			</form>
		)
		if (this.state.loading) {
			form= <Spinner/>
		}
		return (
			<div className={styles.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		)
	}
}

export default  ContactData