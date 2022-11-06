import "../styles/globals.css";
import type { AppProps } from "next/app";
// Layout
import Layout from "../components/layout";
import { client } from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { useGlobalStore } from "../lib/store";
import { useEffect, useRef } from "react";
import { ThemeProvider } from "next-themes";
import { NextSeo } from "next-seo";
import { DefaultSeo } from "next-seo";
import PlausibleProvider from "next-plausible";

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
    <PlausibleProvider
      domain="corraldecerdos.com"
      trackOutboundLinks
      enabled={true}
      trackLocalhost={true}
      selfHosted={true}
      customDomain="https://sholomitosanalytics.app.obeskay.com"
    >
      <ApolloProvider client={client}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
        >
          <NextSeo
            titleTemplate="%s | Corral de cerdos"
            title="Revista literaria"
            description="Revista literaria que trata temas de actualidad, con un enfoque disruptivo, estableciendo la semejanza entre los cerdos y los humanos."
          />
          <DefaultSeo
            openGraph={{
              type: "website",
              locale: "en_IE",
              url: "https://www.corraldecerdos.com",
              siteName: "Corral de cerdos",
            }}
            twitter={{
              handle: "@handle",
              site: "@site",
              cardType: "summary_large_image",
            }}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    </PlausibleProvider>
  );
}
