import Document, { Html, Head, Main, NextScript } from 'next/document'
import Loader from '../components/Loader'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang='fr'>
        <Head />
        <body>
          <div id='preloader'>
            <Loader />
          </div>
          <div className='isLoading'>
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
