'use strict';
import * as React from 'react';

function TextInput(props) {
  const rows = props.text ? Math.round(props.text.length / 41) : 0;

  return (
    <Choose>
      <When condition={props.maxLength <= 110}>
        <label className={props.className + ' css_full_width'} htmlFor={props.fieldName}>
          <If condition={props.fieldName !== '-'}>{props.fieldName}:</If>
          <input
            className='form-control css_full_width'
            name={props.fieldName}
            id={props.fieldName}
            value={props.text ? props.text : ''}
            onChange={props.onChange}
            maxLength={props.maxLength}
            disabled={props.disabled}
          />
        </label>
      </When>
      <Otherwise>
        <label className={props.className + ' css_full_width'} htmlFor={props.fieldName}>
          <If condition={props.fieldName !== '-'}>{props.fieldName}:</If>
          <textarea
            className='autoExpand form-control css_full_width'
            name={props.fieldName}
            id={props.fieldName}
            value={props.text ? props.text : ''}
            rows={rows > 0 ? rows : 1}
            onChange={props.onChange}
            maxLength={props.maxLength}
            disabled={props.disabled}
          />
        </label>
      </Otherwise>
    </Choose>
  );
}

TextInput.defaultProps = {
  text: '',
  fieldName: '-',
  onChange: () => {},
  maxLength: 5000,
  type: 'default',
  disabled: false,
  className: {}
};

export default TextInput;
