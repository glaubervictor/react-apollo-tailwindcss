import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  DefaultOptions,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GRAPHQL_URL } from "./helpers/constants";
import { AppProvider } from "./contexts";

import Router from "./routes";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Router />
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
