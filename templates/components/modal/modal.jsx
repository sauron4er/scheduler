import React from 'react';
import '../../../static/css/modal.css';

const Modal = (props) => {
  return (
    <If condition={props.open}>
      <div className='css_backdrop' onClick={props.onClose} />
      <div
        className='css_modal'
        id={props.id}
        style={{
          // transform: props.open ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.open ? 1 : 0,
          ...props.style
        }}
      >
        <button type='button' className='close mt-4 mr-4' aria-label='Close' onClick={props.onClose}>
          <span aria-hidden='true'>&times;</span>
        </button>

        <Choose>
          <When condition={!props.few_childs}>
            <div className='css_modal_child'>{props.children}</div>
          </When>
          <Otherwise>
            <For each='child' of={props.children} index='idx'>
              <If condition={child != null}>
                <div key={idx} className='css_modal_child'>
                  {child}
                </div>
              </If>
            </For>
          </Otherwise>
        </Choose>

        {/*{props.children}*/}
      </div>
    </If>
  );
};

Modal.defaultProps = {
  id: 'modal',
  open: false,
  onBackdropClick: () => {},
  style: {},
  few_childs: false
};

export default Modal;
