import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import redirect from '../utils/redirect'

const withoutAuth = (WrappedComponent) => {
  const Component = (props) => {
    const { isAuth, user } = useContext(UserContext)

    if (isAuth) return redirect({}, `/users/${user.name}`)

    return <WrappedComponent {...props} />
  }

  return Component
}

export default withoutAuth
