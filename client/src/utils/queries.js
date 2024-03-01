import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`
  query get_me() {
    get_me {
      _id
      username
      email
      bookCount
      SavedBooks
    }
  }
`;
