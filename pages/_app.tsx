import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Metrics from "@/components/Metrics";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Metrics />
      <Analytics />
    </>
  );
}

export default MyApp;
