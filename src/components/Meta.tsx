import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <title>Bolt Weather</title>
      <meta
        name="description"
        content="Check the weather and get weather alerts anywhere in the world."
      />
      <meta name="msapplication-TileColor" content="#13429a" />
      <meta
        name="theme-color"
        content="#ffffff"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content="#1C52B7"
        media="(prefers-color-scheme: dark)"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link rel="icon" href="/favicon.ico" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f0725d" />
    </Head>
  );
}
