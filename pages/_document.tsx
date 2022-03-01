/* eslint-disable  */
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    const darkMode = (ctx as any).req.cookies?.darkmode || "";
    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps, darkMode };
  }

  render() {
    const isDark = (this.props as any).darkMode === "dark";

    return (
      <Html className={`${isDark ? "tw-dark" : ""}`}>
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=G-WKJ9B8V7V0`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-WKJ9B8V7V0', {
                                page_path: window.location.pathname,
                                });
                            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
