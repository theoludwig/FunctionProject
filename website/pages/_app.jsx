/* Libraries Imports */
import Router from 'next/router'
import NProgress from 'nprogress'

/* Components Imports */
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

/* Contexts Imports */
import UserContextProvider from '../contexts/UserContext'

/* CSS Imports */
import 'notyf/notyf.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../public/fonts/Montserrat/Montserrat.css'
import '../styles/suneditor.min.css'
import '../styles/normalize.css'
import '../styles/grid.css'
import '../styles/general.css'
import '../styles/nprogress.css'
import '../styles/pages/admin.css'
import '../styles/pages/404.css'
import '../styles/pages/index.css'
import '../styles/pages/profile.css'
import '../styles/pages/register-login.css'
import '../styles/pages/users.css'
import '../styles/pages/FunctionComponent.css'
import '../styles/pages/functions/chronometerTimer.css'
import '../styles/pages/functions/rightPrice.css'
import '../styles/pages/functions/toDoList.css'
import '../styles/components/Header.css'
import '../styles/components/FunctionTabs.css'
import '../styles/components/CommentCard.css'
import '../styles/components/FunctionComments.css'
import '../styles/components/FunctionsList.css'
import '../styles/components/UserCard.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }) => (
  <UserContextProvider>
    <Header />
    <div className='content container-fluid'>
      <Component {...pageProps} />
    </div>
    <Footer />
  </UserContextProvider>
)

export default App
