const Loader = ({ width, height, speed }) => (
  <svg width={width} height={height} viewBox='0 0 100 100'>
    <g transform='translate(50 50) rotate(0) scale(1 1) translate(-50 -50)'>
      <image
        style={{
          transformOrigin: '50% 50%',
          animation: `${speed} linear 0s infinite normal forwards running Loader__spin`
        }}
        x='0'
        y='0'
        width='100'
        height='100'
        href='/images/FunctionProject_icon.png'
      />
    </g>
  </svg>
)

Loader.defaultProps = {
  width: '100px',
  height: '100px',
  speed: '.9s'
}

export default Loader
