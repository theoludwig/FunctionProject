import Head from 'next/head'

const HeadTag = (props) => {
  const {
    title = 'FunctionProject',
    image = '/images/FunctionProject_icon_small.png',
    description = "Apprenez la programmation grâce à l'apprentissage par projet alias fonction.",
    url = 'https://function.divlo.fr/'
  } = props

  return (
    <Head>
      <title>{title}</title>
      <link rel='icon' type='image/png' href={image} />

      {/* Meta Tag */}
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content={description} />
      <meta name='Language' content='fr' />
      <meta name='theme-color' content='#ffd800' />

      {/* Open Graph Metadata */}
      <meta property='og:title' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={image} />
      <meta property='og:description' content={description} />
      <meta property='og:locale' content='fr_FR' />
      <meta property='og:site_name' content={title} />

      {/* Twitter card Metadata */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:image:src' content={image} />

      {/* PWA Data */}
      <link rel='manifest' href='/manifest.json' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='mobile-web-app-capable' content='yes' />
      <link rel='apple-touch-icon' href={image} />

      {/* Preloader script */}
      <script src='/js/preloader.js' />
    </Head>
  )
}

export default HeadTag
