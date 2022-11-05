import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = process.env.API_URL || "http://localhost:1337/graphql";
const API_TOKEN = process.env.API_TOKEN;

export const client = new ApolloClient({
  uri: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
