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
     
     const handleDelete= (id) => {
          api()
          // .delete(`https://refu-stories-api.herokuapp.com/stories/${id}`)
          .delete(`/friends/${id}`)
              .then (res => {
                 console.log(res.data)
                 setFriends(res.data)
              } )
              .catch(err => console.log('Error: ', err))        
        }

    return ( 
     <div>
          <h3>Friends</h3>
          <button onClick={() => {
                    localStorage.removeItem('token');
                    // eslint-disable-next-line no-restricted-globals
                    history.push('/login')}}>Logout</button>
               <div className='list'>
                    {friends.map((i,id) => (
                         <Friend key={i.id} name={i.name} age={i.age} email={i.email}
                         removeFriend={() => handleDelete(i.id)} />
                    ))}
               </div>
     </div>
     );
}
 
export default FriendsList;