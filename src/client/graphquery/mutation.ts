import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($data: LoginInput!) {
    loginUser(data: $data) {
      token
      userName
    }
  }
`;
