//Import necessary modules for operation
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import {ADD_USER} from '../utils/mutations';
import Auth from '../utils/auth';

//Create a constant to handle the sign up form
const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  
  //Add a mutation to handle passing data to the database
  const [addUser, {error, data}] = useMutation(ADD_USER)
  
  //Create a constant to handle user-created text typed in the login form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  //Create a function to handle what happens when the form is submitted
  const handleFormSubmit = async (event) => {
    //Prevent the page from reloading and clearing the data
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //Add a user to the database by passing the form data to the database via the mutator
    try {
      const {data} = await addUser({
        variables: {...userFormData},
      });
      Auth.login(data.addUser.token);
    } 
    //Throw an error if the try contents fails
    catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    //Clear the form after form submission by updating the state variable 
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  //Create a return that outlines the javascript to be passed to the web browser
  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>
        {/*Create a group to accept an username*/}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>
        {/*Create a group to accept an email*/}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          {/*Display that an email is required*/}
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>
        {/*Create a group to accept a password*/}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          {/*Display that a password is required*/}
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        {/*Create a button to accept form submission*/}
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

//Export the module for use
export default SignupForm;