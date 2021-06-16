import { gql } from '@apollo/client';

export const VIEWER = gql`
  query {
    viewer {
      role
      sub
      mail
      name
      businessId
      businessName
      storeId
      storeName
      avatar
      currency
    }
  }
`;

export const GET_MIN_PRODUCTS_INFO = gql`
  query {
    getProducts {
      _id
      name
      price
    }
  }
`;

export const GET_PRODUCTS_LIST = gql`
  query {
    getProducts {
      _id
      name
      price
      imgs
      desc
      comments
    }
  }
`;
