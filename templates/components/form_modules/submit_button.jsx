import * as React from 'react';
import {useState} from 'react';

function SubmitButton(props) {
  const [clicked, setClicked] = useState(false);

  function onClick() {
    setClicked(true);
    props.onClick();
    if (props.timer) {
      setTimeout(() => setClicked(false), props.timeout);
    } else {
      setClicked(false);
    }
  }

  return (
    <div className='d-flex align-content-center'>
      <button className={`css_button mb-2 ${props.className}`} onClick={onClick} disabled={clicked || props.disabled}>
        {props.text}
      </button>
      <If condition={props.done}>
        <div className='text-success ml-2'>{props.done_text}</div>
      </If>
    </div>
  );
}

SubmitButton.defaultProps = {
  className: '',
  text: '???',
  onClick: () => {},
  disabled: false,
  timer: true,
  timeout: 10000,
  done: false,
  done_text: ''
};

export default SubmitButton;
