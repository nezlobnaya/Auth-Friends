import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import FriendsList from './components/FriendsList/FriendsList'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { getToken } from './utils/api'
import './App.css';

function App() {
  const signedIn = getToken()

  return (
    <div className="App">
      <h1>A Friend in Need is a Friend Indeed</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/login'>Log In</Link>
        {signedIn && <Link to='/friendslist'>Friends</Link>}
      </nav>
      <Route exact path='/login' component={LoginForm} />
      <PrivateRoute exact path='/friendslist' component={FriendsList} />
    </div>
  );
}

export default withRouter(App);
