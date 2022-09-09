import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />

        <meta name="title" content="ChatsQL – Fullstack Chat App" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chat-ts-graphql.vercel.app/" />
        <meta name="image" property="og:image" content="/favicon.png" />
        <meta property="og:image:url" content="/favicon.png" />
        <meta property="og:title" content="ChatsQL – Fullstack Chat App" />
        <meta property="og:site_name" content="ChatsQL – Fullstack Chat App" />
        <meta
          property="og:description"
          content="Connect with each other through realtime connection"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://chat-ts-graphql.vercel.app/"
        />
        <meta name="twitter:title" content="ChatsQL – Fullstack Chat App" />
        <meta
          name="twitter:description"
          content="Connect with each other through realtime connection"
        />
        <meta name="twitter:image" content="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
