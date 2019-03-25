import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
// import axios from '../../axios';

import './Blog.css';
import Posts from './Posts/Posts'
import asyncComponent from '../../hoc/asyncComponent'
// import NewPost from './NewPost/NewPost'

const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'))

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
		auth: true
    }

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to='/posts/'
                                exact
                                activeClassName='my-active'
                                activeStyle={{
                                   color: 'violet',
                                   textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname:'/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path='/' exact render={() => <Posts/>}/>
                <Route path='/new-post' exact render={() => <h1 style={{textAlign: 'center'}}>New Post</h1>}/>*/}

                <Switch>
					{this.state.auth ? <Route path='/new-post' component={AsyncNewPost}/> : null}
                    <Route path='/posts' component={Posts}/>
                    <Route render={() => <h1>Not found!</h1>}/>
                    {/*<Redirect from='/' to='/posts'/>*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;
