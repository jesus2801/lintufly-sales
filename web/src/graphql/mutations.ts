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
        name
        currency
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input)
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($_id: ID!) {
    deleteProduct(_id: $_id)
  }
`;
