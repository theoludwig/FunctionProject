import Link from 'next/link'
import { forwardRef, memo } from 'react'
import { API_URL } from '../../utils/config/config'
import './UserCard.css'

const UserCard = memo(
  forwardRef((props, ref) => {
    return (
      <div className='UserCard col-sm-24 col-md-10 col-xl-7' ref={ref}>
        <Link href='/users/[name]' as={`/users/${props.name}`}>
          <a className='UserCard__container'>
            <img
              className='UserCard__logo'
              src={API_URL + props.logo}
              alt={props.name}
            />
            <h2 className='UserCard__name'>{props.name}</h2>
          </a>
        </Link>
      </div>
    )
  })
)

export default UserCard
