import * as React from 'react';
import 'static/css/loader.css';

export function Loader(props) {
  return (
    <div className={` ${props.className || 'py-3'}`}>
      <div className='dot-flashing'></div>
    </div>
  );
}
