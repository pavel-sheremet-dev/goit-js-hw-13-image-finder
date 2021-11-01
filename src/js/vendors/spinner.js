import { Spinner } from 'spin.js';

const opts = {
  lines: 11,
  length: 3,
  width: 2,
  radius: 5,
  scale: 1.0,
  corners: 1,
  color: '#d3ebd0',
  fadeColor: 'transparent',
  animation: 'spinner-line-shrink',
  rotate: 0,
  direction: 1,
  speed: 1,
  zIndex: 2e9,
  className: 'spinner',
  top: '50%',
  left: '50%',
  shadow: '0 0 1px transparent',
  position: 'absolute',
};

const spinner = new Spinner(opts);

export default spinner;
