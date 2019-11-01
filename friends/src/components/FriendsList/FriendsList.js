import React, { useState, useEffect } from 'react';
import Friend from '../..//components/Friend/Friend'
import api from '../../utils/api'

const FriendsList = ({history, ...props}) => {
     console.log('List props', props)
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
     <div>
          <h3>Friends</h3>
          <button onClick={() => {
                    localStorage.removeItem('token');
                    // eslint-disable-next-line no-restricted-globals
                    history.push('/login')}}>Logout</button>
               <div className='list'>
                    {friends.map((i,id) => (
                         <Friend key={i.id} name={i.name} age={i.age} email={i.email} />
                    ))}
               </div>
     </div>
     );
}
 
export default FriendsList;