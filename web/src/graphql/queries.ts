import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query Login($input: LoginInput!) {
    loginEmployee(input: $input)
  }
`;
