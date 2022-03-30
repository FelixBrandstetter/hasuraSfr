import React from 'react';
import { render } from 'react-dom';
import './index.css';
import {ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, createHttpLink, split} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import LoginUsers from './components/LoginUser';
import CreatePayment from './components/CreatePayment'
import Payments from './components/Payments';
import Transactions from './components/Transactions';

const httpLink = createHttpLink({
  uri: 'https://sfrhasura.hasura.app/v1/graphql',
});

// Add Hasura admin secret header to allow permission to perform mutations and queries
const authLink = setContext((_, { headers }) => {
  const token = 'm46Gp8uPOJTGIEhtPGO0wipDaz12IJOMCLamPI3LXo95xZSvxUqEwRhHhIxbUM9T';
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": token
    }
  }
});

const wsLink = new WebSocketLink({
    uri: "wss://sfrhasura.hasura.app/v1/graphql",
    options: {
      connectionParams: {
        headers: {
          "x-hasura-admin-secret": 'm46Gp8uPOJTGIEhtPGO0wipDaz12IJOMCLamPI3LXo95xZSvxUqEwRhHhIxbUM9T'
        }
      },
    },
  });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <LoginUsers/>
      <CreatePayment/>
      <h3>Payments</h3> 
      <Payments/>
      <h3>Transactions</h3>
      <Transactions/>
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);