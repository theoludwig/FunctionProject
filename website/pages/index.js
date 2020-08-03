import { useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Link from 'next/link'
import HeadTag from '../components/HeadTag'
import Loader from '../components/Loader'
import '../public/css/pages/index.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Home = () => {
  useEffect(() => {
    console.log(
      '%c ⚙️ FunctionProject',
      'color: #ffd800; font-weight: bold; background-color: #181818;padding: 10px;border-radius: 10px;font-size: 20px'
    )
  }, [])

  return (
    <>
      <HeadTag />
      <div className='Home__container container-fluid text-center'>

        <AutoPlaySwipeableViews enableMouseEvents interval={15000}>

          {/* Slide 1 */}
          <div className='row align-items-center justify-content-center'>
            <div className='col-24'>
              <h1 className='title-important'>FunctionProject</h1>
              <p className='Home__description'>
                                Apprenez la programmation grâce à l'apprentissage par projet alias fonction (en <span className='important'>JavaScript</span>).
                <br />
                <Link href='/about'>
                  <a>En savoir plus ? (à-propos)</a>
                </Link>
                <br />
                                Découvrez la liste des fonctions disponibles :
              </p>
            </div>
            <div className='col-24 Home__logo-spin'>
              <Link href='/functions'>
                <a><Loader width='100%' height='13em' speed='5s' /></a>
              </Link>
            </div>
          </div>

          {/* Slide 2 */}
          <div className='row align-items-center justify-content-center'>
            <div className='col-24'>
              <h1 className='title-important'>Code Source</h1>
              <p className='Home__description'>
                                Le partage est essentiel afin de progresser. <br />
                                Par conséquent chaque fonction a un article expliquant comment elle fonctionne et <br />
                                le code source du projet est disponible sur mon profil GitHub :
              </p>
            </div>
            <div className='col-24'>
              <a target='_blank' rel='noopener noreferrer' href='https://github.com/Divlo/FunctionProject'><img className='Home__image-width' src='/images/GitHub.png' alt='GitHub' /></a>
            </div>
          </div>

        </AutoPlaySwipeableViews>

      </div>
    </>
  )
}

export default Home
