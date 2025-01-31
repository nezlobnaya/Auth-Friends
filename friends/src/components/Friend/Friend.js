import React from 'react';

const Friend = (props) => {
    console.log('Friend props',props)
    return ( 
        <div className='friend'>
            <button  onClick={ () => props.removeFriend(props.id)}>X</button>
            <h2>{props.name}</h2>
            <div>Age: {props.age}</div>
            <div>Email: {props.email}</div>
        </div>
     );
}
 
export default Friend;