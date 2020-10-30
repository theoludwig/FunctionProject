import Link from 'next/link'
import { useState, forwardRef, memo } from 'react'
import date from 'date-and-time'
import Loader from '../Loader'
import { API_URL } from '../../utils/api'
import './FunctionCard.css'

const FunctionCard = memo(
  forwardRef((props, ref) => {
    const [isLoading, setIsLoading] = useState(true)

    const handleLoad = () => {
      setIsLoading(false)
    }

    const handleError = event => {
      event.target.src = API_URL + '/images/functions/default.png'
    }

    const isFormOrArticle = props.type === 'form' || props.type === 'article'

    return (
      <Link
        {...(props.isAdmin
          ? {
              href: '/admin/[slug]',
              as: `/admin/${props.slug}`
            }
          : {
              href: isFormOrArticle
                ? '/functions/[slug]'
                : `/functions/${props.slug}`,
              as: `/functions/${props.slug}`
            })}
      >
        {/* FunctionCard a une hauteur pendant chargement */}
        <a
          ref={ref}
          style={
            isLoading ? { height: '360px', justifyContent: 'center' } : null
          }
          className='FunctionCard col-sm-24 col-md-10 col-xl-7'
        >
          {isLoading && <Loader width='125px' height='125px' />}

          <div
            className={`FunctionCard__container ${isLoading ? 'd-none' : ''}`}
          >
            <div className='FunctionCard__top'>
              <img
                onLoad={handleLoad}
                onError={handleError}
                className='FunctionCard__image'
                alt={props.title}
                src={API_URL + props.image}
              />
              <h2 className='FunctionCard__title'>{props.title}</h2>
              <p className='FunctionCard__description text-center'>
                {props.description}
              </p>
            </div>
            <div className='FunctionCard__info'>
              <p
                className='FunctionCard__category'
                style={{ backgroundColor: props.categorie.color }}
              >
                {props.categorie.name}
              </p>
              <p className='FunctionCard__publication-date'>
                {date.format(new Date(props.createdAt), 'DD/MM/YYYY', false)}
              </p>
            </div>
          </div>
        </a>
      </Link>
    )
  })
)

export default FunctionCard
