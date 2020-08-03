const FunctionTabsTop = props => {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <ul className='FunctionTabs__nav'>
          {props.tabNames.map((tabName, index) => {
            return (
              <li key={index} className='FunctionTabs__nav-item'>
                <a
                  className={`FunctionTabs__nav-link ${
                    props.slideIndex === index
                      ? 'FunctionTabs__nav-link-active'
                      : ''
                  }`}
                  onClick={() => props.setSlideIndex(index)}
                >
                  {tabName}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default FunctionTabsTop
