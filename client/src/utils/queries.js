import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`{
  get_me {
      _id
      username
      email
      bookCount
      SavedBooks  
    }
  }
`;
