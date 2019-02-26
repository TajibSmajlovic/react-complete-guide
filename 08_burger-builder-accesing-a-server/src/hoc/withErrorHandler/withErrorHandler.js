import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedContent, axios) => {
	return class extends Component {
		state = {
			error: null
		}
		componentWillMount() {
			this.reqInterceptors = axios.interceptors.request.use(req => {
				this.setState({error: null})
				return req
			})
			this.resInterceptors = axios.interceptors.response.use(res => res, error => {
				this.setState({error})
			})
		}
		errorConfirmedHandler = () => {
			this.setState({error: null})
		}
		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptors)
			axios.interceptors.response.eject(this.resInterceptors)
		}

		render () {
			return (
					<Aux>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedContent {...this.props} />
				</Aux>
			)
		}
	}
}


export default withErrorHandler
