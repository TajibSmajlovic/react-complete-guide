import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom'
// import axios from '../../axios';

import './Blog.css';
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to='/'
                                exact
                                activeClassName='my-active'
                                activeStyle={{
                                   color: 'violet',
                                   textDecoration: 'underline'
                                }}>Home</NavLink></li>
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
                <Route path='/' exact component={Posts}/>
                <Route path='/new-post' component={NewPost}/>
                <Route path='/:id' component={FullPost}/>
            </div>
        );
    }
}

export default Blog;
