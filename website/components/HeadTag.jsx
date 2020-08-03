import Head from 'next/head'

const HeadTag = ({ title, image, description }) => (
  <Head>
    <title>{title || ''}</title>
    <link rel='icon' type='image/png' href={image} />

    {/* Meta Tag */}
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='description' content={description} />
    <link rel='canonical' href='function.divlo.fr' />
    <meta name='Language' content='fr' />
    <meta name='theme-color' content='#ffd800' />

    {/* Open Graph Metadata */}
    <meta property='og:title' content={title} />
    <meta property='og:type' content='website' />
    <meta property='og:url' content='https://function.divlo.fr/' />
    <meta property='og:image' content={image} />
    <meta property='og:description' content={description} />
    <meta property='og:locale' content='fr_FR' />
    <meta property='og:site_name' content='FunctionProject' />

    {/* Twitter card Metadata */}
    <meta name='twitter:card' content='summary' />
    <meta name='twitter:description' content={description} />
    <meta name='twitter:title' content={title} />
    <meta name='twitter:site' content='@Divlo_FR' />
    <meta name='twitter:image:src' content={image} />
    <meta name='twitter:creator' content='@Divlo_FR' />

    {/* Preloader script */}
    <script src='/js/preloader.js' />
  </Head>
)

HeadTag.defaultProps = {
  title: 'FunctionProject',
  description: "Apprenez la programmation grâce à l'apprentissage par projet alias fonction.",
  image: '/images/FunctionProject_icon_small.png'
}

export default HeadTag
