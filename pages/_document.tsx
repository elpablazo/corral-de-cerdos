import { useTheme } from "next-themes";
import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";
import { useGlobalStore } from "../lib/store";

export default function Document() {
  const { theme } = useTheme();

  return (
    <Html>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐽</text></svg>"
        />
      </Head>
      <body className="transition-all ease-in dark:bg-dark dark:text-white/60">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
