import Link from 'next/link'
import { useState, forwardRef, memo } from 'react'
import date from 'date-and-time'
import Loader from '../Loader'
import { API_URL } from '../../utils/api'

const FunctionCard = memo(
  forwardRef((props, ref) => {
    const [isLoading, setIsLoading] = useState(true)

    const handleLoad = () => {
      setIsLoading(false)
    }

    const handleError = (event) => {
      event.target.src = API_URL + '/images/functions/default.png'
    }

    const isFormOrArticle = props.type === 'form' || props.type === 'article'

    return (
      <>
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

        <style jsx>{`
          .FunctionCard {
            display: flex;
            align-items: center;
            position: relative;
            flex-direction: column;
            word-wrap: break-word;
            box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, 0.25);
            border: 1px solid black;
            border-radius: 1rem;
            margin: 0 0 50px 0;
            cursor: pointer;
            transition: all 0.3s;
            color: var(--text-color);
            text-decoration: none !important;
          }
          .FunctionCard__container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .FunctionCard:hover {
            transform: translateY(-7px);
          }
          /* col-md */
          @media (min-width: 768px) {
            .FunctionCard {
              margin: 0 30px 50px 30px;
            }
          }
          /* col-xl */
          @media (min-width: 1200px) {
            .FunctionCard {
              margin: 0 20px 50px 20px;
            }
          }

          .FunctionCard__top {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
          }
          .FunctionCard__image {
            width: 150px;
          }
          .FunctionCard__title {
            font-size: 1.4em;
            margin: 0;
            color: var(--important);
            font-weight: 300;
          }
          .FunctionCard__description {
            margin: 20px 0 10px 0;
          }
          .FunctionCard__info {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          .FunctionCard__category {
            border-radius: 0.5em;
            padding: 0.5em;
            margin-right: 20px;
            font-size: 16.4px;
          }
        `}
        </style>
      </>
    )
  })
)

export default FunctionCard
