import Link from 'next/link'
import { useState } from 'react'
import Cookies from 'universal-cookie'
import HeadTag from '../../components/HeadTag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../components/Modal'
import FunctionsList from '../../components/FunctionsList/FunctionsList'
import AddEditFunction from '../../components/FunctionAdmin/AddEditFunction'
import redirect from '../../utils/redirect'

const Admin = props => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <>
      <HeadTag
        title='Admin - FunctionProject'
        description="Page d'administration de FunctionProject."
      />

      {/* Création d'une fonction */}
      {isOpen
        ? (
          <Modal toggleModal={toggleModal}>
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
                      <h2 className='text-center'>Crée une nouvelle fonction</h2>
                    </div>
                  </div>
                </div>

                <div className='col-24'>
                  <AddEditFunction
                    defaultInputState={{ type: 'form' }}
                    {...props}
                  />
                </div>
              </div>
            </div>
          </Modal>
          )
        : (
          <FunctionsList isAdmin token={props.user.token}>
            <div className='col-24'>
              <h1 className='Functions__title'>Administration</h1>
              <button
                onClick={toggleModal}
                style={{ margin: '0 0 40px 0' }}
                className='btn btn-dark'
              >
                Crée une nouvelle fonction
              </button>
              <Link href='/admin/manageCategories'>
                <button style={{ margin: '0 0 0 20px' }} className='btn btn-dark'>
                  Gérer les catégories
                </button>
              </Link>
              <Link href='/admin/manageQuotes'>
                <button style={{ margin: '0 0 0 20px' }} className='btn btn-dark'>
                  Gérer les citations
                </button>
              </Link>
            </div>
          </FunctionsList>
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

export default Admin
