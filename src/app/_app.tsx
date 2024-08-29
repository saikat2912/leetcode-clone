import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <>
    <RecoilRoot>
      <Head>
        <title>LeetCode</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Web application that contains LeetCode problems and solutions" />
      </Head>
      <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
