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

export const GET_PROFILE = gql`
  query ($data: UserByIdInput!) {
    UserById(data: $data) {
      id
      email
      firstName
      lastName
      userName
      following {
        id
        createdAt
        user {
          id
          email
          userName
        }
      }
      createdAt
    }
  }
`;
