import { useState } from 'react'
import htmlParser from 'html-react-parser'
import Loader from '../../components/Loader'
import HeadTag from '../../components/HeadTag'
import api from '../../utils/api'
import redirect from '../../utils/redirect'
import withoutAuth from '../../hoc/withoutAuth'

const newPassword = (props) => {
  const [inputState, setInputState] = useState({})
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const inputStateNew = { ...inputState }
    inputStateNew[event.target.name] = event.target.value
    setInputState(inputStateNew)
  }

  const handleSubmit = (event) => {
    setIsLoading(true)
    event.preventDefault()
    api.put('/users/reset-password', { ...inputState, tempToken: props.token })
      .then(({ data }) => {
        setMessage(`<p class="form-success"><b>Succès:</b> ${data.result}</p>`)
        setIsLoading(false)
        setInputState({})
      })
      .catch((error) => {
        setMessage(`<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`)
        setIsLoading(false)
      })
  }

  return (
    <>
      <HeadTag
        title='Nouveau mot de passe - FunctionProject'
        description='Mise à jour du mot de passe.'
      />
      <div className='container Register-Login__container'>
        <div className='row Register-Login__row justify-content-center'>
          <div className='col-20'>
            <h1 className='Register-Login__title'>Nouveau mot de passe</h1>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label className='form-label' htmlFor='password'>Mot de passe :</label>
                <input onChange={handleChange} type='password' name='password' id='password' className='form-control' placeholder='******' />
              </div>
              <div className='form-group text-center'>
                <button type='submit' className='btn btn-dark'>Envoyer</button>
              </div>
            </form>
            <div className='form-result text-center'>
              {
                (isLoading)
                  ? <Loader />
                  : htmlParser(message)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps (context) {
  if (context.query.token != null) {
    return {
      props: {
        token: context.query.token
      }
    }
  }
  return redirect(context, '/404')
}

export default withoutAuth(newPassword)
