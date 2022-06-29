import React from 'react';
import '../../../static/css/modal.css';

const Modal = (props) => {
  return (
    <If condition={props.open}>
      <div className='css_backdrop' onClick={props.onClose} />
      <div
        className='css_modal'
        style={{
          // transform: props.open ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.open ? 1 : 0,
          ...props.style
        }}
      >
        <button type='button' className='close' aria-label='Close' onClick={props.onClose}>
          <span aria-hidden='true'>&times;</span>
        </button>
        {props.children}
      </div>
    </If>
  );
};

Modal.defaultProps = {
  open: false,
  onBackdropClick: () => {},
  style: {}
};

export default Modal;
