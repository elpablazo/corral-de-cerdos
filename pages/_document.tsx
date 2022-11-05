import { useTheme } from "next-themes";
import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";
import { useGlobalStore } from "../lib/store";

export default function Document() {
  const { theme } = useTheme();

  return (
    <Html>
      <Head />
      <body className="dark:bg-dark dark:text-white/60">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
