import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Server } from 'styletron-engine-atomic';
import { styletron } from '../styletron';

class MyDocument extends Document<{ stylesheets: any[] }> {
  static getInitialProps = async (context: any) => {
    const page = await Document.getInitialProps(context);
    const stylesheets = (styletron as Server).getStylesheets() || [];
    return { ...page, stylesheets };
  };

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="//api.openweathermap.org" />
          <link rel="preconnect" href="//maps.googleapis.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
          <style>{`
            * {
              box-sizing: border-box;
            }
            html {
              height: 100%;
              min-height: 100vh;
              overflow: auto;
              margin: 0;
              padding: 0;
            }
            body {
              height: 100%;
              min-height: 100vh;
              overflow: auto;
              margin: 0;
              padding: 0;
              font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
              letter-spacing: -0.01em;
            }
            ::selection {
              background: #FF897B;
              color: white;
            }
          `}</style>
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
