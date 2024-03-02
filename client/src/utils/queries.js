import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`
  query get_me($userId: ID!) {
    get_me (userId: $userId) {
      _id
      username
      email
      bookCount
      SavedBooks
    }
  }
`;
