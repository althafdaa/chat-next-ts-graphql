import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($data: LoginInput!) {
    loginUser(data: $data) {
      token
      userName
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Mutation($data: RegisterInput!) {
    registerUser(data: $data) {
      userName
      lastName
      firstName
      email
      createdAt
      id
    }
  }
`;

export const LOGOUT = gql`
  mutation Mutation {
    logout {
      id
      userName
      message
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation Mutation($data: payload!) {
    updatedProfile(data: $data) {
      updatedAt
      userName
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation Mutation($data: MessageInput!) {
    sendMessage(data: $data) {
      createdAt
      id
      text
      receiverId
      senderId
    }
  }
`;

export const GET_USER = gql`
  mutation Mutation($data: UserByUsernameInput!) {
    UserByUsername(data: $data) {
      id
      createdAt
      userName
      firstName
      lastName
      email
      followed
      followings {
        user {
          id
          userName
        }
      }
    }
  }
`;

export const FOLLOW = gql`
  mutation Mutation($data: followPeopleInput!) {
    followPeople(data: $data) {
      id
      createdAt
      user {
        id
        userName
        lastName
        firstName
      }
    }
  }
`;

export const UNFOLLOW = gql`
  mutation Mutation($data: followPeopleInput!) {
    unFollow(data: $data) {
      id
      user {
        id
        lastName
        firstName
        userName
      }
    }
  }
`;
