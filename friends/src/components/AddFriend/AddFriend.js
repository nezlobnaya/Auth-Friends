import React, { useState, useEffect } from 'react';
import api from '../../utils/api'
import { Form, Field, withFormik } from 'formik'
import * as yup from 'yup'


const AddFriend = ({ errors, touched, values, status }) => {
    const [friends, setFriends] = useState([])
   
    useEffect(() => {
        status ? (
            setFriends([...friends, status])
        ): ( console.log('effect fired'))
         // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    return ( 
        <div className='user-form'>
         <Form>
            <h1>Add a New Friend!</h1>
            <Field name='name' type='text' placeholder='Add Name' />

            {touched.name && errors.name && (
                <p className='error'>{errors.name}</p>
            )}
            <Field name='age' type='number' placeholder='Add Age' />

            {touched.age && errors.age && (
                <p className='error'>{errors.age}</p>
            )}

            <Field name='email' type='email' placeholder='Email' />

            {touched.email && errors.email && (
                <p className='error'>{errors.email}</p>
            )}

            <label className='checkbox-container'>
                <h3>Are You 100% Sure?.</h3>
            <Field 
                type='checkbox'
                name='checkbox'
                checked ={values.checkbox}
            />

            {touched.checkbox && errors.checkbox && (
                <p className='error'>{errors.checkbox}</p>
            )}

            <span className='checkmark' />
            </label>
            <button type='submit'>Submit</button>
         </Form>
         
        </div>
     );
     
}

export default withFormik({

    mapPropsToValues: ( values ) => {
        return {
            name: values.name || '',
            age: values.age || '',
            email: values.email || '',
            checkbox: values.checkbox || false
        };
    },
    validationSchema: yup.object().shape({
        name: yup.string().required('Fill out all fields!'),
        email: yup.string().email('Email not valid').required(),
        age: yup.string().required(),
        checkbox: yup.boolean().oneOf([true], 'Must check the Box')
    }),

    handleSubmit(values, { setStatus }) {
        api()
        .post('/friends', values)
        .then(res => {
            console.log(res)
            setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }



 })(AddFriend)

 
