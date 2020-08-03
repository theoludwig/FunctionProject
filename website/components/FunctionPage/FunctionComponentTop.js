import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import date from 'date-and-time'
import { UserContext } from '../../contexts/UserContext'
import api from '../../utils/api'
import { API_URL } from '../../utils/config/config'
import '../FunctionCard/FunctionCard.css'

const FunctionComponentTop = (props) => {
  const { isAuth, user } = useContext(UserContext)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (isAuth && user.token != null) {
      fetchFavorite()
    }
  }, [isAuth])

  const fetchFavorite = async () => {
    try {
      const favoriteResponse = await api.get(`/favorites/${props.id}`, { headers: { Authorization: user.token } })
      setIsFavorite(favoriteResponse.data.isFavorite)
    } catch {}
  }

  const toggleFavorite = async () => {
    if (isAuth && user.token != null) {
      try {
        if (isFavorite) {
          const response = await api.delete(`/favorites/${props.id}`, { headers: { Authorization: user.token } })
          if (response.status === 200) return setIsFavorite(false)
        }
        const response = await api.post(`/favorites/${props.id}`, {}, { headers: { Authorization: user.token } })
        if (response.status === 201) return setIsFavorite(true)
      } catch {}
    }
  }

  const handleError = (event) => {
    event.target.src = API_URL + '/images/functions/default.png'
  }

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center text-center'>
        <div className='FunctionComponent__top col-24'>

          {(isAuth) &&
            <FontAwesomeIcon onClick={toggleFavorite} {...(isFavorite) ? { icon: faStar } : { icon: farStar }} title={(isFavorite) ? 'Retirer la fonction des favoris' : 'Ajouter la fonction aux favoris'} className='FunctionComponent__star-favorite' />}

          <img onError={handleError} className='FunctionComponent__image' src={API_URL + props.image} alt={props.title} />
          <h1 className='FunctionComponent__title title-important'>{props.title}</h1>
          <p className='FunctionComponent__description'>{props.description}</p>
          <div className='FunctionCard__info'>
            <Link href={`/functions?categoryId=${props.categorieId}`}>
              <a className='FunctionCard__category' style={{ backgroundColor: props.categorie.color, color: 'inherit' }}>{props.categorie.name}</a>
            </Link>
            <p className='FunctionCard__publication-date'>{date.format(new Date(props.createdAt), 'DD/MM/YYYY', true)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FunctionComponentTop
