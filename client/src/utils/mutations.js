//Imported needed modules
import { gql } from '@apollo/client';

//Create a mutation that will update the database with the logged in user's token
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user{
        _id
        email
      }
    }
  }
`;

//Create a mutation that will add a user to the database
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user{
        _id
        username
        email
      }
    }
  }
`;

//Create a mutation to save a book to a user's saved book list in the database
export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

//Create a mutation to remove a book from a user's saved book list in the database
export const REMOVE_BOOK = gql`
  mutation removeBook($userId: ID!, $bookId: String!) {
    removeBook(userId: $userId, bookId: $bookId) {        
          savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
      }
    }
`;
