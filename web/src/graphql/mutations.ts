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

export const LOGIN_QUERY = gql`
  mutation Login($input: LoginInput!) {
    loginEmployee(input: $input) {
      token
      payload {
        role
        sub
        mail
        businessId
        businessName
        storeId
        storeName
        avatar
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input)
  }
`;
