import { useState } from 'react'
import redirect from '../../utils/redirect'
import FunctionPage from '../../components/FunctionPage/FunctionPage'
import FunctionTabs from '../../components/FunctionPage/FunctionTabs'
import FunctionArticle from '../../components/FunctionPage/FunctionArticle'
import FunctionComments from '../../components/FunctionPage/FunctionComments/FunctionComments'
import Loader from '../../components/Loader'
import api from '../../utils/api'
import '../../public/css/pages/FunctionComponent.css'
import '../../public/css/pages/functions/rightPrice.css'

const PlayRightPrice = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [productToGuess, setProductToGuess] = useState({})
  const [isLoadingProduct, setIsLoadingProduct] = useState(false)
  const [enteredPrice, setEnteredPrice] = useState('')
  const [attemptsArray, setAttemptsArray] = useState([])

  const handlePlaying = () => {
    setIsPlaying(true)
    setAttemptsArray([])
    fetchRandomAmazonProduct()
  }

  const fetchRandomAmazonProduct = async () => {
    setIsLoadingProduct(true)
    const { data } = await api.post('/functions/rightPrice')
    setProductToGuess(data)
    setIsLoadingProduct(false)
  }

  const handleChange = (event) => {
    setEnteredPrice(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const objectTry = {}
    const guessedPrice = Number((enteredPrice).replace(',', '.').replace(' ', ''))
    if (!isNaN(guessedPrice)) {
      objectTry.guessedPrice = guessedPrice
      objectTry.numberTry = attemptsArray.length + 1
      if (guessedPrice > productToGuess.price) {
        objectTry.message = "C'est moins !"
      } else if (guessedPrice < productToGuess.price) {
        objectTry.message = "C'est plus !"
      } else {
        objectTry.message = 'Bravo, vous avez trouvé le juste prix !'
      }
      setAttemptsArray([objectTry, ...attemptsArray])
    }
    setEnteredPrice('')
  }

  return (
    <div className='container-fluid'>
      {
        (!isPlaying)
          ? (
            <div className='row justify-content-center'>
              <div className='form-group text-center'>
                <button onClick={handlePlaying} type='submit' className='btn btn-dark'>Jouer</button>
              </div>
            </div>
          )
          : (isLoadingProduct)
            ? (
              <div className='row justify-content-center'>
                <Loader />
              </div>
            )
            : (
              <>
                <div className='row justify-content-center'>
                  <div style={{ marginBottom: '20px' }} className='col-24 text-center'>
                    <h4>{productToGuess.name}</h4>
                    <img src={productToGuess.image} alt={productToGuess.name} className='Product__image' />
                  </div>
                </div>

                <div className='row justify-content-center'>
                  <div style={{ marginBottom: '25px' }} className='col-24'>
                    {((attemptsArray.length > 0) && attemptsArray[0].message === 'Bravo, vous avez trouvé le juste prix !')
                      ? (
                        <div className='form-group text-center'>
                          <button onClick={handlePlaying} type='submit' className='btn btn-dark'>Rejouer ?</button>
                        </div>
                      )
                      : (
                        <form onSubmit={handleSubmit}>
                          <div className='text-center'>
                            <input value={enteredPrice} onChange={handleChange} name='enteredPrice' id='enteredPrice' type='number' step='0.01' className='form-control' autoComplete='off' placeholder='Devinez le prix (prix à virgule possible!)' />
                          </div>

                          <div className='form-group text-center'>
                            <button type='submit' className='btn btn-dark'>Deviner</button>
                          </div>
                        </form>
                      )}
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }} className='row justify-content-center'>
                  {attemptsArray.map((attempt, index) => {
                    const { message } = attempt
                    let priceResultClass
                    if (message === "C'est moins !") {
                      priceResultClass = 'Price__result-moins'
                    } else if (message === "C'est plus !") {
                      priceResultClass = 'Price__result-plus'
                    } else {
                      priceResultClass = 'Price__result-success'
                    }
                    return (
                      <div key={index} className={`col-24 Price__result ${priceResultClass}`}>
                                      # {attempt.numberTry} ({attempt.guessedPrice}) {message}
                      </div>
                    )
                  })}
                </div>
              </>
            )
      }
    </div>
  )
}

const FunctionTabManager = (props) => {
  return (
    <FunctionTabs setSlideIndex={props.setSlideIndex} slideIndex={props.slideIndex}>
      <div style={{ marginTop: '10px' }}>
        <PlayRightPrice />
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

const rightPrice = (props) => (
  <FunctionPage
    FunctionTabManager={FunctionTabManager}
    {...props}
    tabNames={['🕹️ Jouer', '📝 Article', '📬 Commentaires']}
  />
)

export async function getServerSideProps (context) {
  return api.get('/functions/rightPrice')
    .then((response) => ({ props: response.data }))
    .catch(() => redirect(context, '/404'))
}

export default rightPrice
