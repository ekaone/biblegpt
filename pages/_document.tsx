import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Generate answer from BibleGPT." />

          {/* <!-- Google / Search Engine Tags --> */}
          <meta itemProp="name" content="BibleGPT" />
          <meta
            property="og:site_name"
            content="https://biblegpt.prasetia.me"
          />
          <meta
            property="og:description"
            content="Generate answer from BibleGPT."
          />
          <meta
            itemProp="image"
            content="https://biblegpt.prasetia.me/og-image.png"
          />
          {/* <!-- Facebook Meta Tags --> */}
          <meta property="og:url" content="https://biblegpt.prasetia.me" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="BibleGPT" />
          <meta
            property="og:description"
            content="Generate answer from BibleGPT."
          />
          <meta
            property="og:image"
            content="https://biblegpt.prasetia.me/og-image.png"
          />
          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="BibleGPT Question and Answer" />
          <meta
            name="twitter:description"
            content="Answered your question from BibleGPT."
          />
          <meta
            property="og:image"
            content="https://biblegpt.prasetia.me/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://biblegpt.prasetia.me/og-image.png"
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
