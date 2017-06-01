import ApolloClient, { createNetworkInterface } from 'apollo-client';

import { ApolloProvider } from 'react-apollo';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://localhost/api',
    opts: {
      credentials: 'same-origin'
    }
  })
});

window.addEventListener('load', () => {
  client.initialState = window.__APOLLO_STATE__;
  ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
  );
});
