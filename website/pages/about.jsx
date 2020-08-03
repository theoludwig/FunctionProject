import axios from 'axios'
import ReactMarkdown from 'react-markdown/with-html'
import HeadTag from '../components/HeadTag'

const About = props => {
  return (
    <>
      <HeadTag
        title='À-propos - FunctionProject'
        description='À-propos de FunctionProject.'
      />

      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-24 text-center'>
            <h1 style={{ marginBottom: 0, paddingTop: '20px' }}>À-propos</h1>
            <p
              style={{
                marginTop: '5px',
                borderBottom: '1px solid var(--important)',
                paddingBottom: '30px'
              }}
            >
              (README.md du{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/Divlo/FunctionProject'
              >
                GitHub
              </a>
              )
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }} className='row'>
          <div className='col-24'>
            <ReactMarkdown
              source={props.data}
              escapeHtml={false}
              linkTarget='_blank'
              transformLinkUri={uri => {
                if (uri.startsWith('./')) {
                  return `https://github.com/Divlo/FunctionProject/blob/master/${uri.slice(
                    2
                  )}`
                }
                return uri
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps (_context) {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/Divlo/FunctionProject/master/README.md'
  )
  return {
    props: { data }
  }
}

export default About
