import React, { useState, useEffect } from 'react';
import api from '../../utils/api'

const FriendForm = (props) => {
    console.log('Form props', props)
    const [friend, setFriend] = useState({ 
      name: '', email: '', age: ''});

    useEffect(() => {
      const friendToEdit = props.friends.find(
        friend => `${friend.id}` === props.match.params.id
      );
  
      if (friendToEdit) setFriend(friendToEdit);
    }, [props.friends, props.match.params.id]);
  

    // const editFriend = (friend) => {
    //     api().put(`/friends/${friend.id}`, friend)
    //       .then(res => {
    //         setFriend(res.data);
    //         props.history.push("/friendslist");
    //       })
    //       .catch(err => console.log(err.response));
    //   };
    
  
  const handleChange = event => setFriend({...friend, [event.target.name]: event.target.value});

  const handleSubmit = event => {
    event.preventDefault();
    api().put(`/friends/${friend.id}`, friend)
          .then(res => {
            props.updateFriends(res.data);
            props.history.push("/friendslist");
          })
          .catch(err => console.log(err.response));
      };
  

  return (
    <form onSubmit={handleSubmit}>
      <input name='name'
             placeholder="name"
             value={friend.name}
             onChange={handleChange} />
      <input name='age'
             placeholder="age"
             value={friend.age}
             onChange={handleChange} />
      <input name='email'
             placeholder='email'
             value={friend.email}
             onChange={handleChange} />     
      <button type='submit'>Update Friend</button>
    </form>
  );
};

export default FriendForm;