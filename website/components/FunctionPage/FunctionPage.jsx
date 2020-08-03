import { useState } from 'react'
import { API_URL } from '../../utils/config/config'
import HeadTag from '../HeadTag'
import FunctionTabsTop from './FunctionTabsTop'
import FunctionComponentTop from './FunctionComponentTop'

const FunctionPage = props => {
  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <>
      <HeadTag
        title={props.title}
        description={props.description}
        image={API_URL + props.image}
      />

      <div className='container-fluid'>
        <FunctionTabsTop
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
          tabNames={props.tabNames}
        />
        <FunctionComponentTop {...props} />
        <props.FunctionTabManager
          {...props}
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
        />
      </div>
    </>
  )
}

export default FunctionPage
