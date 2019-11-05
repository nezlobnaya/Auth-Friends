import React from 'react';
import api from '../../utils/api'
import FriendForm from '../FriendForm/FriendForm'
import { Route } from 'react-router-dom';

const Friend = (props) => {
    console.log('Friend props',props)

    const friend = props.friends.find(
        thing => `${thing.id}` === props.match.params.id
    )
        console.log('Friend', friend)

        if (!props.friends.length || !friend) {
            return <h2>Loading friend data...</h2>;
          }
    const handleDelete= e => {
        e.preventDefault()
             api()
             .delete(`/friends/${friend.id}`)
                 .then (res => {
                    console.log(res.data)
                    props.updateFriends(res.data)
                    props.history.push('/friendslist')
                 } )
                 .catch(err => console.log('Error: ', err))        
           }

    return ( 
        <div className='friend'>
             <h2>Name:{friend.name}</h2>
            <h2>Age: {friend.age}</h2>
            <h3>Email: {friend.email}</h3>
            <button  onClick={ handleDelete}>X</button>
            <button  onClick={() => props.history.push(`/friendslist/edit/${friend.id}`)}>Edit</button>
            {/* <NavLink exact to ={`/friendslist/${props.id}`}> Friend</NavLink> */}
            <Route exact path='/friendslist/edit/:id' render={props => (
        <FriendForm {...props} />
      )} />
            {/* <Link to={`/friendslist/edit/${props.id}`}>Edit</Link> */}
           
        </div>
     );
}
 
export default Friend;