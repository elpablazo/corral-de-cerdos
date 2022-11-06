import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/graphqlichis";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

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

export const newsletter = async (data: any) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query: `  mutation AddContactToNewsletter($data: SuscriptorInput!) {
    createSuscriptor(data: $data) {
      data {
        id
        attributes {
          Correo
        }
      }
    }
  }`,
      variables: {
        data,
      },
    }),
  });

  return res;
};
