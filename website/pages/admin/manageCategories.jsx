import { useState } from 'react'
import Cookies from 'universal-cookie'
import date from 'date-and-time'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { PhotoshopPicker } from 'react-color'
import HeadTag from '../../components/HeadTag'
import Modal from '../../components/Modal'
import redirect from '../../utils/redirect'
import htmlParser from 'html-react-parser'
import Loader from '../../components/Loader'
import useAPI from '../../hooks/useAPI'
import api from '../../utils/api'
import '../../public/css/pages/admin.css'

const defaultCategoryState = { name: '', color: '#ffffff' }

const AddEditCategory = props => {
  const [inputState, setInputState] = useState(props.defaultInputState)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event, isTypeCheck = false) => {
    const inputStateNew = { ...inputState }
    inputStateNew[event.target.name] =
      event.target.files != null
        ? event.target.files[0]
        : isTypeCheck
          ? event.target.checked
          : event.target.value
    setInputState(inputStateNew)
  }

  const apiCallCategory = () => {
    if (props.isEditing) {
      return api.put(
        `/admin/categories/${inputState.id}`,
        { name: inputState.name, color: inputState.color },
        { headers: { Authorization: props.user.token } }
      )
    }
    return api.post('/admin/categories', inputState, {
      headers: { Authorization: props.user.token }
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setIsLoading(true)
    apiCallCategory()
      .then(() => {
        setIsLoading(false)
        window.location.reload(true)
      })
      .catch(error => {
        setMessage(
          `<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`
        )
        setIsLoading(false)
      })
  }

  return (
    <div className='Admin__Modal__container container-fluid'>
      <div className='Admin__Modal__row row'>
        <div className='col-24'>
          <div className='Admin__Modal-top-container row'>
            <div className='col-24'>
              <span
                onClick={props.handleToggleModal}
                style={{ cursor: 'pointer', position: 'absolute', left: 0 }}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ width: '1.5rem', color: 'red' }}
                />
              </span>
              <h2 className='text-center'>
                {props.isEditing
                  ? 'Modifier la catégorie'
                  : 'Crée une nouvelle catégorie'}
              </h2>
            </div>
          </div>
        </div>

        <div className='col-24'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='form-label' htmlFor='name'>
                Nom :
              </label>
              <input
                value={inputState.name}
                onChange={handleChange}
                type='text'
                name='name'
                id='name'
                className='form-control'
                placeholder='(e.g : ✨ Utilitaires)'
              />
            </div>

            <div className='form-group'>
              <label className='form-label' htmlFor='title'>
                Couleur :
              </label>
              <PhotoshopPicker
                color={inputState.color}
                onChange={color =>
                  handleChange({ target: { name: 'color', value: color.hex } })}
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
  )
}

const manageCategories = props => {
  const [, categories] = useAPI('/categories')
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [defaultInputState, setDefaultInputState] = useState(
    defaultCategoryState
  )

  const toggleModal = () => setIsOpen(!isOpen)

  const handleRemoveCategory = async categoryId => {
    try {
      await api.delete(`/admin/categories/${categoryId}`, {
        headers: { Authorization: props.user.token }
      })
      window.location.reload(true)
    } catch {}
  }

  const handleEditCategory = categoryInfo => {
    setDefaultInputState(categoryInfo)
    setIsEditing(true)
    toggleModal()
  }

  return (
    <>
      <HeadTag
        title='Admin - FunctionProject'
        description="Page d'administration de FunctionProject. Gérer les catégories."
      />

      {isOpen ? (
        <Modal>
          <AddEditCategory
            handleToggleModal={toggleModal}
            defaultInputState={defaultInputState}
            {...props}
            isEditing={isEditing}
          />
        </Modal>
      ) : (
        <div className='container-fluid text-center'>
          <div className='row justify-content-center'>
            <div className='col-24'>
              <h1>Gérer les catégories</h1>
              <button
                onClick={() => {
                  setDefaultInputState(defaultCategoryState)
                  toggleModal()
                  setIsEditing(false)
                }}
                style={{ margin: '0 0 40px 0' }}
                className='btn btn-dark'
              >
                Ajouter une catégorie
              </button>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='container-fluid'>
              <div className='col-24 table-column'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th className='table-row' scope='col'>
                        id
                      </th>
                      <th className='table-row' scope='col'>
                        name
                      </th>
                      <th className='table-row' scope='col'>
                        color
                      </th>
                      <th className='table-row' scope='col'>
                        createdAt
                      </th>
                      <th className='table-row' scope='col'>
                        updatedAt
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
                    {categories.map(category => {
                      return (
                        <tr
                          key={category.id}
                          style={{ backgroundColor: category.color }}
                        >
                          <td className='table-row'>{category.id}</td>
                          <td className='table-row'>{category.name}</td>
                          <td className='table-row'>{category.color}</td>
                          <td className='table-row'>
                            {date.format(
                              new Date(category.createdAt),
                              'DD/MM/YYYY à HH:mm',
                              true
                            )}
                          </td>
                          <td className='table-row'>
                            {date.format(
                              new Date(category.updatedAt),
                              'DD/MM/YYYY à HH:mm',
                              true
                            )}
                          </td>
                          <td
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleEditCategory({
                                name: category.name,
                                color: category.color,
                                id: category.id
                              })}
                          >
                            <FontAwesomeIcon
                              icon={faPen}
                              style={{ width: '1.5rem' }}
                            />
                          </td>
                          <td
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleRemoveCategory(category.id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ width: '1.5rem' }}
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps (context) {
  const cookies = new Cookies(context.req.headers.cookie)
  const user = { ...cookies.get('user') }
  if (!user.isAdmin) {
    return redirect(context, '/404')
  }
  return {
    props: { user }
  }
}

export default manageCategories
