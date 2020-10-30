import { useState, useEffect, useContext, useRef, useCallback } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../contexts/UserContext'
import redirect from '../../utils/redirect'
import htmlParser from 'html-react-parser'
import Loader from '../../components/Loader'
import FunctionPage from '../../components/FunctionPage/FunctionPage'
import FunctionTabs from '../../components/FunctionPage/FunctionTabs'
import FunctionArticle from '../../components/FunctionPage/FunctionArticle'
import FunctionComments from '../../components/FunctionPage/FunctionComments/FunctionComments'
import Modal from '../../components/Modal'
import api from '../../utils/api'
import 'notyf/notyf.min.css'
import '../../public/css/pages/FunctionComponent.css'
import '../../public/css/pages/admin.css'

const CreateLink = ({ linksData, setLinksData }) => {
  const { isAuth, user } = useContext(UserContext)
  const [inputState, setInputState] = useState({ url: '', shortcutName: '' })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async event => {
    setIsLoading(true)
    event.preventDefault()
    try {
      const response = await api.post('/links', inputState, {
        headers: { Authorization: user.token }
      })
      const linksDataState = { ...linksData }
      linksDataState.rows.push(response.data.linkDatabase)
      setLinksData(linksDataState)
      setMessage(response.data.resultHTML)
      setIsLoading(false)
      setInputState({ url: '', shortcutName: '' })
    } catch (error) {
      setIsLoading(false)
      setMessage(error.response.data.message)
    }
  }

  const handleChange = event => {
    const inputStateNew = { ...inputState }
    inputStateNew[event.target.name] = event.target.value
    setInputState(inputStateNew)
  }

  if (!isAuth) {
    return (
      <p className='text-center'>
        Vous devez être{' '}
        <Link href='/users/login'>
          <a>connecté</a>
        </Link>{' '}
        pour gérer des liens raccourcis.
      </p>
    )
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-24'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='form-label' htmlFor='url'>
                Entrez le lien à raccourcir :
              </label>
              <input
                value={inputState.url}
                onChange={handleChange}
                type='text'
                name='url'
                id='url'
                placeholder='(e.g : https://divlo.fr)'
                className='form-control'
              />
            </div>

            <div className='form-group'>
              <label className='form-label' htmlFor='shortcutName'>
                Entrez le nom du raccourci :
              </label>
              <input
                value={inputState.shortcutName}
                onChange={handleChange}
                type='text'
                name='shortcutName'
                id='shortcutName'
                placeholder='(e.g : divlo)'
                className='form-control'
              />
            </div>

            <div className='form-group text-center'>
              <button type='submit' className='btn btn-dark'>
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='form-result text-center'>
        {isLoading ? <Loader /> : htmlParser(message)}
      </div>
    </div>
  )
}

let pageLinks = 1
const LinksList = ({
  linksData,
  setLinksData,
  isLoadingLinks,
  setLoadingLinks
}) => {
  const { isAuth, user } = useContext(UserContext)
  const [isEditing, setIsEditing] = useState(false)

  const [defaultInputState, setDefaultInputState] = useState({
    shortcutName: '',
    url: '',
    id: 1
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toggleModal = () => {
    if (isEditing) {
      setIsLoading(false)
      setMessage('')
      setDefaultInputState({ shortcutName: '', url: '', id: 1 })
    }
    setIsEditing(!isEditing)
  }

  // Récupère les liens initiales
  useEffect(() => {
    getLinksData().then(data => setLinksData(data))
  }, [])

  const handleChange = event => {
    const inputStateNew = { ...defaultInputState }
    inputStateNew[event.target.name] = event.target.value
    setDefaultInputState(inputStateNew)
  }

  const handleRemoveLink = async linkId => {
    try {
      await api.delete(`/links/${linkId}`, {
        headers: { Authorization: user.token }
      })
      const linksDataState = { ...linksData }
      const deletedLinkIndex = linksData.rows.findIndex(link => {
        return link.id === linkId
      })
      linksDataState.rows.splice(deletedLinkIndex, 1)
      setLinksData(linksDataState)

      let Notyf
      if (typeof window !== 'undefined') {
        Notyf = require('notyf')
      }
      const notyf = new Notyf.Notyf({
        duration: 5000
      })
      notyf.success('Succès: lien raccourci supprimé!')
    } catch {}
  }

  const handleEditLink = linkInfo => {
    toggleModal()
    setDefaultInputState({
      shortcutName: linkInfo.shortcut,
      url: linkInfo.url,
      id: linkInfo.id
    })
  }

  const handleEditSubmit = async event => {
    setIsLoading(true)
    event.preventDefault()
    try {
      const response = await api.put(
        `/links/${defaultInputState.id}`,
        defaultInputState,
        {
          headers: { Authorization: user.token }
        }
      )
      const linksDataState = { ...linksData }
      const editedLinkIndex = linksData.rows.findIndex(link => {
        return link.id === defaultInputState.id
      })
      if (editedLinkIndex != null) {
        linksDataState.rows[editedLinkIndex].shortcut =
          defaultInputState.shortcutName
        linksDataState.rows[editedLinkIndex].url = defaultInputState.url
        setLinksData(linksDataState)
      }
      setMessage(response.data.resultHTML)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setMessage(error.response.data.message)
    }
  }

  const getLinksData = async () => {
    setLoadingLinks(true)
    const { data } = await api.get(`/links?page=${pageLinks}&limit=20`, {
      headers: { Authorization: user.token }
    })
    setLoadingLinks(false)
    return data
  }

  // Permet la pagination au scroll
  const observer = useRef()
  const lastLinkRef = useCallback(
    node => {
      if (isLoadingLinks) return
      if (observer.current) observer.current.disconnect()
      observer.current = new window.IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && linksData.hasMore) {
            pageLinks += 1
            getLinksData().then(data => {
              setLinksData(oldData => {
                return {
                  hasMore: data.hasMore,
                  rows: [...oldData.rows, ...data.rows],
                  totalItems: data.totalItems
                }
              })
            })
          }
        },
        { threshold: 1 }
      )
      if (node) observer.current.observe(node)
    },
    [isLoadingLinks, linksData.hasMore]
  )

  if (!isAuth) {
    return (
      <p className='text-center'>
        Vous devez être{' '}
        <Link href='/users/login'>
          <a>connecté</a>
        </Link>{' '}
        pour gérer des liens raccourcis.
      </p>
    )
  }

  return (
    <div className='container-fluid text-center'>
      <div className='row justify-content-center'>
        <div className='col-24'>
          <h1>Gérer les liens</h1>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='container-fluid'>
          {!isEditing
            ? (
              <div className='col-24 table-column'>
                <table className='table' style={{ marginBottom: '40px' }}>
                  <thead>
                    <tr>
                      <th className='table-row' scope='col'>
                        Liens
                      </th>
                      <th className='table-row' scope='col'>
                        Nom
                      </th>
                      <th className='table-row' scope='col'>
                        Compteur de clics
                      </th>
                      <th className='table-row' scope='col'>
                        Modifier
                      </th>
                      <th className='table-row' scope='col'>
                        Supprimer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {linksData.rows.map((link, index) => {
                      const linkJSX = (
                        <>
                          <td className='table-row'>
                            <a href={link.url}>{link.url}</a>
                          </td>
                          <td className='table-row'>
                            <a href={`https://s.divlo.fr/${link.shortcut}`}>
                              {link.shortcut}
                            </a>
                          </td>
                          <td className='table-row'>{link.count}</td>
                          <td
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEditLink(link)}
                          >
                            <FontAwesomeIcon
                              icon={faPen}
                              style={{ width: '1.5rem' }}
                            />
                          </td>
                          <td
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleRemoveLink(link.id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ width: '1.5rem' }}
                            />
                          </td>
                        </>
                      )
                      // Si c'est le dernier élément
                      if (linksData.rows.length === index + 1) {
                        return (
                          <tr key={index} ref={lastLinkRef}>
                            {linkJSX}
                          </tr>
                        )
                      }
                      return <tr key={index}>{linkJSX}</tr>
                    })}
                  </tbody>
                </table>
              </div>
              )
            : (
              <Modal>
                <div className='Admin__Modal__container container-fluid'>
                  <div className='Admin__Modal__row row'>
                    <div className='col-24'>
                      <div className='Admin__Modal-top-container row'>
                        <div className='col-24'>
                          <span
                            onClick={toggleModal}
                            style={{
                              cursor: 'pointer',
                              position: 'absolute',
                              left: 0
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              style={{ width: '1.5rem', color: 'red' }}
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='col-24'>
                      <form onSubmit={handleEditSubmit}>
                        <div className='form-group'>
                          <label className='form-label' htmlFor='url'>
                            Entrez le lien à raccourcir :
                          </label>
                          <input
                            value={defaultInputState.url}
                            onChange={handleChange}
                            type='text'
                            name='url'
                            id='url'
                            placeholder='(e.g : https://divlo.fr)'
                            className='form-control'
                          />
                        </div>

                        <div className='form-group'>
                          <label className='form-label' htmlFor='shortcutName'>
                            Entrez le nom du raccourci :
                          </label>
                          <input
                            value={defaultInputState.shortcutName}
                            onChange={handleChange}
                            type='text'
                            name='shortcutName'
                            id='shortcutName'
                            placeholder='(e.g : divlo)'
                            className='form-control'
                          />
                        </div>

                        <div className='form-group text-center'>
                          <button type='submit' className='btn btn-dark'>
                            Envoyer
                          </button>
                        </div>
                      </form>
                      <div className='form-result text-center'>
                        {isLoading ? <Loader /> : htmlParser(message)}
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
              )}
        </div>
      </div>
    </div>
  )
}

const FunctionTabManager = props => {
  const [linksData, setLinksData] = useState({
    hasMore: true,
    rows: [],
    totalItems: 0
  })
  const [isLoadingLinks, setLoadingLinks] = useState(true)

  return (
    <FunctionTabs
      setSlideIndex={props.setSlideIndex}
      slideIndex={props.slideIndex}
    >
      <div className='FunctionComponent__slide'>
        <CreateLink
          linksData={linksData}
          setLinksData={setLinksData}
          isLoadingLinks={isLoadingLinks}
          setLoadingLinks={setLoadingLinks}
        />
      </div>
      <div className='FunctionComponent__slide'>
        <LinksList
          linksData={linksData}
          setLinksData={setLinksData}
          isLoadingLinks={isLoadingLinks}
          setLoadingLinks={setLoadingLinks}
        />
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

const linkShortener = props => (
  <FunctionPage
    FunctionTabManager={FunctionTabManager}
    {...props}
    tabNames={['⚙️ Utilisation', '📜 Liste', '📝 Article', '📬 Commentaires']}
  />
)

export async function getServerSideProps (context) {
  return api
    .get('/functions/linkShortener')
    .then(response => ({ props: response.data }))
    .catch(() => redirect(context, '/404'))
}

export default linkShortener
