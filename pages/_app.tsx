import "../styles/globals.css";
import type { AppProps } from "next/app";
// Layout
import Layout from "../components/layout";
import { client } from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { useGlobalStore } from "../lib/store";
import { useEffect, useRef } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // ¡Oink!
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("/sounds/oink.mp3") : undefined
  );
  // State del ¡oink!
  const { oink, setOink } = useGlobalStore((state) => ({
    oink: state.oink,
    setOink: state.setOink,
  }));

  // Detecta cuando se activa el oink, lo reproduce y lo apaga
  useEffect(() => {
    if (oink) {
      audio.current?.play().then(() => {
        setOink(false);
      });
    }
  }, [oink, setOink]);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
