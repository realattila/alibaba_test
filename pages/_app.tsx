/* eslint-disable  */
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { RecoilRoot } from "recoil";

import * as ga from "../lib/google";

// STYLES
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout;

  const RenderComponent = () => {
    return !!getLayout ? getLayout(<Component {...pageProps} />) : <Component {...pageProps} />;
  };

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <RecoilRoot>
        <RenderComponent />
      </RecoilRoot>
    </>
  );
}
export default appWithTranslation(MyApp);
