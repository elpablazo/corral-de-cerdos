import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

export const client = new ApolloClient({
  uri: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
  cache: new InMemoryCache(),
});
