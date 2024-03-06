//Imported needed modules
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import {LOGIN_USER} from '../utils/mutations';
import Auth from '../utils/auth';

//Create a constant to handle the login form
const LoginForm = () => {
  //Declare state constants to handle data that needs to be tracked between functions
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //Create a mutator to handle user login with the database
  const [loginUser, {error}] = useMutation(LOGIN_USER)

  //Create a constant to handle user-created text typed in the login form
  const handleInputChange = (event) => {
    //Pull the data entered into the user form
    const { name, value } = event.target;
    //Set the form data constant to be accessed later
    setUserFormData({ ...userFormData, [name]: value });
  };

  //Create a function to handle what happens when the form is submitted
  const handleFormSubmit = async (event) => {
    //Prevent the page from reloading and clearing the data
    event.preventDefault();
    //Take the data from the current target and check its validity
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //Try to log the user in by passing the form data to the database via the mutator, then save the data to local storage
    try {
      const {data} = await loginUser({
        variables: {...userFormData},
      });
      Auth.login(data.login.token);
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
      {/*Create a form to accept login data*/}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/*Create an alert to display an error for failed login credentials*/}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        {/*Create a group to accept an email*/}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          {/*Display that an email is required*/}
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>
        {/*Create a group to accept an username*/}
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
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

//Export the module for use
export default LoginForm;