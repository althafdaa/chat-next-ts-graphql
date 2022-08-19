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
