import FunctionTabs from '../../components/FunctionPage/FunctionTabs'
import FunctionForm from '../../components/FunctionPage/FunctionForm'
import FunctionArticle from '../../components/FunctionPage/FunctionArticle'
import FunctionComments from '../../components/FunctionPage/FunctionComments/FunctionComments'
import FunctionPage from '../../components/FunctionPage/FunctionPage'
import redirect from '../../utils/redirect'
import api from '../../utils/api'
import '../../public/css/pages/FunctionComponent.css'

const FunctionTabManager = props => {
  if (props.type === 'form') {
    return (
      <FunctionTabs
        setSlideIndex={props.setSlideIndex}
        slideIndex={props.slideIndex}
      >
        <div className='FunctionComponent__slide'>
          <FunctionForm
            inputsArray={[...(props.utilizationForm || [])]}
            slug={props.slug}
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

  return (
    <FunctionTabs
      setSlideIndex={props.setSlideIndex}
      slideIndex={props.slideIndex}
    >
      <div className='FunctionComponent__slide'>
        <FunctionArticle article={props.article} />
      </div>
      <div className='FunctionComponent__slide'>
        <FunctionComments functionId={props.id} />
      </div>
    </FunctionTabs>
  )
}

const FunctionComponent = props => (
  <FunctionPage
    FunctionTabManager={FunctionTabManager}
    {...props}
    tabNames={
      props.type === 'form'
        ? ['⚙️ Utilisation', '📝 Article', '📬 Commentaires']
        : ['📝 Article', '📬 Commentaires']
    }
  />
)

export async function getServerSideProps (context) {
  const { slug } = context.params
  return api
    .get(`/functions/${slug}`)
    .then(response => ({ props: response.data }))
    .catch(() => redirect(context, '/404'))
}

export default FunctionComponent
