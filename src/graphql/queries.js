import { gql } from '@apollo/client';

export const GET_CUSTOMERS = gql`
  query {
    allCustomers {
    nodes {
      firstname
      lastname
      phone
    }
  }
  }
`;

