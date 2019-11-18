import React, { useState, useEffect } from 'react';
import { Route, Link, withRouter } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import FriendsList from './components/FriendsList/FriendsList'
import AddFriend from './components/AddFriend/AddFriend'
import FriendForm from './components/FriendForm/FriendForm';
import Friend from './components/Friend/Friend'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { getToken } from './utils/api'
import api from './utils/api'
import './App.css';

function App() {
  const signedIn = getToken()
  const[friends, setFriends] = useState([])


  useEffect(() => {
    api()
    .get('/friends')
    .then(res => {
         console.log('Getting the List',res)
         setFriends(res.data)
    })
    .catch(error => {
         console.log(error)
    })
}, [])

  return (
    <div className="App">
      <h1>A Friend in Need is a Friend Indeed</h1>
      <nav>
        <Link to='/'>Home</Link>
        {!signedIn && <Link to='/login'>Log In</Link>}
        {signedIn && <Link to='/friendslist'>Friends</Link>}
        {signedIn && <Link to='/addfriend'>Add a Fiend</Link>}
        {signedIn && <Link to='/friendslist/edit/:id'>Update Info</Link>}
      </nav>
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/friendslist' render={props => (
          <FriendsList {...props} friends={friends} />
      )} />
      <PrivateRoute exact path='/addfriend' component={AddFriend} />
      <Route exact path='/friendslist/edit/:id' render={props => (
        <FriendForm {...props} friends={friends} updateFriends={setFriends} />
      )} />
      <Route exact path='/friendslist/:id' render={props => (
        <Friend {...props} friends={friends} updateFriends={setFriends} />
      )} />
      {/* <PrivateRoute exact path="/friendslist/edit/:id" render={props => (
          <FriendForm friends= {friends} updateFriends={setFriends} />
        )}/> */}
  </div>
  );
}

export default withRouter(App);
