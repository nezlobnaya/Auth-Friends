import React from 'react';
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import api from '../../utils/api'

const LoginForm = ({ errors, touched }) => {

    return ( 
        <Form className='form-group'>
            <div className='form'>
                <label className='label'>Username</label> 
                    <Field name='username' type='username'
                        autoComplete='off' 
                     />
                     <p>{touched.username && errors.username}</p>
            </div>
            <div className='form'>
                <label className='label'>Password</label> 
                    <Field name='password' type='password'
                        autoComplete='off'
                     />
                    <p>{touched.password && errors.password}</p>
            </div>           
            <button type='submit' >Enter &rarr; </button>
        </Form>
     );
}
 
export default withFormik ({
    mapPropsToValues() {
        return {
            username: '',
            password: ''
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().min(6).required()
    }),
    handleSubmit(values, formikBag) {
        api()
        .post('/login', values)
        .then(res => {
            console.log('Res', res)
            localStorage.setItem('token', res.data.payload)
            formikBag.props.history.push('/friendslist')
        })
        .catch(e => console.log(e.response.data.message))
    }
}) (LoginForm);