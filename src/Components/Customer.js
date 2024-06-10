import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphql/queries';

function Customer() {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.allCustomers.nodes.map(customer => (
        <li key={customer.email}>
          {customer.firstname} ({customer.lastname})
        </li>
      ))}
    </ul>
  );
}

export default Customer;
