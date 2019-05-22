import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

class indexPage extends React.Component {
	static async getInitialProps(context) {
		// console.log(context)
		return {appName: 'Super App'}
	}

	render () {
		return (
			<div>
				<h1>The Main Page of {this.props.appName}</h1>
				<p>Go to <Link href='/auth'><a>Auth Page</a></Link>.</p>
				<button onClick={() => Router.push('/auth')}>Go to Auth</button>
			</div>
		)
	}
}


export default indexPage