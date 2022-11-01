import "../styles/globals.css";
import type { AppProps } from "next/app";
// Layout
import Layout from "../components/layout";
import { client } from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
