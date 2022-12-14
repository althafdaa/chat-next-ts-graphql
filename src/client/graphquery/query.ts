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
      followings {
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

export const GET_MESSAGE = gql`
  query ($data: msgBetweenUserInput!) {
    msgBetweenUser(data: $data) {
      id
      createdAt
      receiverId
      senderId
      text
      type
    }
  }
`;
