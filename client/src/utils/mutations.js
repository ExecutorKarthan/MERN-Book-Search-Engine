import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: STRING!) {
    login(email: $email, password: $password) {
      email
      password
    }
  }
`;
