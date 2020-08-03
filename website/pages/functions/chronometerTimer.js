import { useState } from 'react'
import Codepen from 'react-codepen-embed'
import redirect from '../../utils/redirect'
import FunctionPage from '../../components/FunctionPage/FunctionPage'
import FunctionTabs from '../../components/FunctionPage/FunctionTabs'
import FunctionArticle from '../../components/FunctionPage/FunctionArticle'
import FunctionComments from '../../components/FunctionPage/FunctionComments/FunctionComments'
import Loader from '../../components/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons'
import api from '../../utils/api'
import '../../public/css/pages/FunctionComponent.css'
import '../../public/css/pages/functions/chronometerTimer.css'

let interval
function convertSeconds (seconds) {
  return {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60
  }
}

const Chronometer = () => {
  const [timeLength, setTimeLength] = useState(0) // seconds
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(interval)
    } else {
      if (interval) clearInterval(interval)
      interval = setInterval(() => {
        setTimeLength((time) => time + 1)
      }, 1000)
    }
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    if (interval) clearInterval(interval)
    setIsPlaying(false)
    setTimeLength(0)
  }

  const getFormattedValue = () => {
    const minutesAndSeconds = convertSeconds(timeLength)
    const minutes = (minutesAndSeconds.minutes < 100) ? (('0' + minutesAndSeconds.minutes).slice(-2)) : minutesAndSeconds.minutes
    const seconds = ('0' + minutesAndSeconds.seconds).slice(-2)
    return `${minutes}:${seconds}`
  }

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
        <div className='col-sm-24 col-md-12'>
          <div className='Chronometer__container'>
            <div className='Chronometer__item'>
              <div className='Chronomter__row'>
                <div className='Chronometer__time-left'>
                  {getFormattedValue()}
                </div>
              </div>
            </div>

            <div className='Chronometer__item Chronometer__buttons'>
              <div className='Chronomter__row Chronometer__row-button'>
                <button onClick={handlePlayPause} className='Chronometer-btn'>
                  <FontAwesomeIcon {...(isPlaying) ? { icon: faPause } : { icon: faPlay }} />
                </button>
                <button onClick={handleReset} className='Chronometer-btn' title='Remettre à zéro ?'>
                  <FontAwesomeIcon icon={faSync} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Pomodoro = () => {
  return (
    <div style={{ marginBottom: '50px' }} className='container-fluid'>
      <Codepen hash='vYEbPoB' user='Divlo' height={800} defaultTab='result' preview={false} loader={() => <Loader />} />
    </div>
  )
}

const FunctionTabManager = (props) => {
  return (
    <FunctionTabs setSlideIndex={props.setSlideIndex} slideIndex={props.slideIndex}>
      <div className='FunctionComponent__slide'>
        <Chronometer />
      </div>
      <div className='FunctionComponent__slide'>
        <Pomodoro />
      </div>
      <div className='FunctionComponent__slide'>
        <FunctionArticle article={props.article} />
      </div>
      <div className='FunctionComponent__slide'>
        <FunctionComments functionId={props.id} />
      </div>
    </FunctionTabs>
  )
}

const chronometerTimer = (props) => (
  <FunctionPage
    FunctionTabManager={FunctionTabManager}
    {...props}
    tabNames={['⏰ Chronomètre', '⌛ Pomodoro', '📝 Article', '📬 Commentaires']}
  />
)

export async function getServerSideProps (context) {
  return api.get('/functions/chronometerTimer')
    .then((response) => ({ props: response.data }))
    .catch(() => redirect(context, '/404'))
}

export default chronometerTimer
