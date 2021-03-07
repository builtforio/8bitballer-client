import React from 'react';
import sprite from '../assets/icons/sprite.svg';

const Icon = (props = {}) => (
  <svg className={[
    props.className,
    'inline-block',
    'fill-current',
  ].join(' ')}>
    <use href={`${sprite}#${props.iconKey}`} />
  </svg>
);

export default Icon;
