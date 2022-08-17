import { gql } from '@apollo/client';

export const GET_FOLLOWING = gql`
  query GetFollowing {
    getFollowing {
      user {
        id
        userName
      }
    }
  }
`;
