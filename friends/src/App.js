import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import FriendsList from './components/FriendsList/FriendsList'
import AddFriend from './components/AddFriend/AddFriend'
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
        {!signedIn && <Link to='/login'>Log In</Link>}
        {signedIn && <Link to='/friendslist'>Friends</Link>}
        {signedIn && <Link to='/addfriend'>Add a Fiend</Link>}
      </nav>
      <Route exact path='/login' component={LoginForm} />
      <PrivateRoute exact path='/friendslist' component={FriendsList} />
      <PrivateRoute exact path='/addfriend' component={AddFriend} />
  </div>
  );
}

export default withRouter(App);
