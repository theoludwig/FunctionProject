import Head from 'next/head';

const HeadTag = (props) => (
    <Head>
        <title>{props.title}</title>
        <link rel="icon" type="image/png" href={props.image} />

        {/* Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={props.description} /> 
        <link rel="canonical" href="function.divlo.fr"/> 
        <meta name="Language" content="fr" /> 
        <meta name="theme-color" content="#ffd800" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={props.title} />
        <meta property="og:type" content="website" /> 
        <meta property="og:url" content="https://function.divlo.fr/" /> 
        <meta property="og:image" content={props.image} /> 
        <meta property="og:description" content={props.description} /> 
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="FunctionProject" /> 

        {/* Twitter card Metadata */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:site" content="@Divlo_FR" />
        <meta name="twitter:image:src" content={props.image} />
        <meta name="twitter:creator" content="@Divlo_FR" />
    </Head>
);

export default HeadTag;