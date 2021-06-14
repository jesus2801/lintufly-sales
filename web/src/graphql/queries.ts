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
    }
  }
`;
