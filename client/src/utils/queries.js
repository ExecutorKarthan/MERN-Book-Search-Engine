import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`
  query me ($_id: ID!) {
    me(userId: $_id){
        _id
        username
        email
        savedBooks{
          authors
          description
          bookId
          image
          link
          title
        }
      }
  }
`;


