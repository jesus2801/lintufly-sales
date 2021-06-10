import { gql } from '@apollo/client';

export const CREATE_BUSINESS = gql`
  mutation CreateBusiness(
    $businessInput: BusinessInput!
    $adminInput: AdminInput!
    $recaptcha: String!
  ) {
    createBusiness(business: $businessInput, admin: $adminInput, recaptcha: $recaptcha)
  }
`;
