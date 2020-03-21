import './Loader.css';

const Loader = ({ width, height }) => (
    <svg width={width} height={height} viewBox="0 0 100 100">
        <g transform="translate(50 50) rotate(0) scale(1 1) translate(-50 -50)">
            <image className="Loader" x="0" y="0" width="100" height="100" href="/images/FunctionProject_icon.png"></image>
        </g>
    </svg>
);

export default Loader;