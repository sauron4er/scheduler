import * as React from 'react';
import {useState} from 'react';

function SubmitButton(props) {
  const [clicked, setClicked] = useState(false);

  function onClick() {
    setClicked(true);
    props.onClick();
    if (props.timer) {
      setTimeout(() => setClicked(false), 10000);
    } else {
      setClicked(false);
    }
  }

  return (
    <button className={`css_button my-2 ${props.className}`} onClick={onClick} disabled={clicked || props.disabled}>
      {props.text}
    </button>
  );
}

SubmitButton.defaultProps = {
  className: '',
  text: '???',
  onClick: () => {},
  disabled: false,
  timer: true
};

export default SubmitButton;
