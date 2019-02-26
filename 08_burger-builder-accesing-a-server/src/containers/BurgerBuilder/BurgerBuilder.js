import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('https://myburgerbuilder-smajke.firebaseio.com/ingredients.json').then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {this.setState({error: true})})
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum, el) => sum + el, 0)

        this.setState({purchasable: sum > 0})
    }
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount

        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }

        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return
        }

        const updatedCount = oldCount - 1

        updatedIngredients[type] = updatedCount

        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinuedHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
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
            this.setState({loading: false, purchasing: false})
        }).catch(error => {
            this.setState({loading: false, purchasing: false})
        })
    }
    render () {
        let orderSummary = null
        let burger = this.state.error ? <h1 style={{textAlign: 'center'}}>Ingredients can't be loaded!</h1> : <Spinner/>
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        if (this.state.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.state.ingredients}/>
                                <BuildControls
                                  ingredientAdded={this.addIngredientHandler}
                                  ingredientRemoved={this.removeIngredientHandler}
                                  disabled={disabledInfo}
                                  purchasable={this.state.purchasable}
                                  ordered={this.purchaseHandler}
                                  price={this.state.totalPrice}
                                />
            </Aux>

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                totalPrice={this.state.totalPrice}/>
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)
