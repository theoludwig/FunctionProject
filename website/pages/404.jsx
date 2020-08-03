import Link from 'next/link'
import HeadTag from '../components/HeadTag'
import '../public/css/pages/404.css'

const Error404 = () => (
  <>
    <HeadTag
      title='Erreur 404'
      description="Cette page n'existe pas!"
      image='/images/error404.png'
    />
    <div className='Error404__container'>
      <h1>
        Erreur <span className='important'>404</span>
      </h1>
      <p className='text-center'>
        Cette page n'existe pas!{' '}
        <Link href='/'>
          <a>Revenir à la page d'accueil ?</a>
        </Link>
      </p>
    </div>
  </>
)

export default Error404
