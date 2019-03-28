import React from 'react'

import styles from './Order.module.css'

const order = (props) => {

	const ingredients = []

	for (let ingredient in props.ingredients) {
		ingredients.push({
			name: ingredient,

			amount: props.ingredients[ingredient]})
	}

	console.log(ingredients)

	const ingredientOutput = ingredients.map(ig => {
		return <span key={ig.name} style={{
			textTransform: 'capitalize',
			display: 'inline-block',
			margin: '0 8px',
			border: '1px solid #ccc',
			padding: '5px'
		}} >{ig.name} ({ig.amount})</span>
	})

	return (
	<div className={styles.Order}>
		<p>Ingredients: {ingredientOutput} </p>
		<p>Price: <strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong></p>
	</div>
)}

export default order