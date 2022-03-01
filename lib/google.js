export const pageview = (url) => {
  if (window && window.gtag) {
    window.gtag("config", "G-WKJ9B8V7V0", {
      page_path: url,
    });
  }
};

export const event = ({ action, params }) => {
  window.gtag("event", action, params);
};
