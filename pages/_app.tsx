/* eslint-disable  */
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { RecoilRoot } from "recoil";

// STYLES
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout;

  const RenderComponent = () => {
    return !!getLayout ? getLayout(<Component {...pageProps} />) : <Component {...pageProps} />;
  };

  return (
    <>
      <RecoilRoot>
        <RenderComponent />
      </RecoilRoot>
    </>
  );
}
export default appWithTranslation(MyApp);
