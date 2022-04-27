import * as React from 'react';

function ColorPicker(props) {
  const rows = props.text ? Math.round(props.text.length / 41) : 0;

  return (
    <input type="color" id="head" name="head" value="#e66465" />
  );
}

ColorPicker.defaultProps = {
  text: '',
  fieldName: '-',
  onChange: () => {},
  maxLength: 5000,
  type: 'default',
  disabled: false,
  className: {}
};

export default ColorPicker;
