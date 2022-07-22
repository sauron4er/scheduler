import React, { useEffect } from "react";
import useSetState from 'templates/hooks/useSetState';
import 'static/css/inputs.css';

function Password(props) {
  const [state, setState] = useSetState({
    password_check: ''
  });

  function onPasswordChange(e) {
    props.onChange(e.target.value, checkValidity(e.target.value, state.password_check));
  }

  function onPasswordCheckChange(e) {
    setState({password_check: e.target.value});
    props.onChange(props.password, checkValidity(props.password, e.target.value));
  }

  function validatePassword(pass) {
    const valid = pass.length > 7 && isNaN(pass)
    setState({password_valid: valid});
    return valid
  }

  function checkValidity(password, password_check) {
    const is_password_valid = validatePassword(password);
    const are_passwords_equal = password === password_check;

    if (props.required) {
      // If required, password inputs must be filled
      const passwords_are_not_empty = password !== "" && password_check !== "";
      return is_password_valid && are_passwords_equal && passwords_are_not_empty;
    }

    return is_password_valid && are_passwords_equal;
  }

  return (
    <div className='d-md-flex p-0'>
      <div className='col-md-6'>
        <label htmlFor='password'>Пароль:</label>
        <input
          className={`form-control ${props.password !== '' ? (state.password_valid ? 'css_input_valid' : 'css_input_invalid') : null}`}
          name='password'
          id='password'
          type='password'
          value={props.password}
          onChange={onPasswordChange}
          minLength={8}
          placeholder=''
        />
      </div>
      <div className='col-md-6'>
        <label htmlFor='password_check'>Пароль повторно:</label>
        <input
          className={`form-control ${
            props.password !== '' ? (state.password_check === props.password ? 'css_input_valid' : 'css_input_invalid') : null
          }`}
          name='password_check'
          id='password_check'
          type='password'
          value={state.password_check}
          onChange={onPasswordCheckChange}
          minLength={8}
          placeholder=''
        />
      </div>
    </div>
  );
}

Password.defaultProps = {
  password: '',
  onChange: () => {},
  required: false
};

export default Password;
