import React from 'react';
import 'static/css/table.css';

function Filter(props) {
  function onChange(e) {
    props.onChange(e.target.value);
  }

  return (
    <div className='css_filter'>
      <input
        type='text'
        className='form-control mb-1'
        placeholder='Пошук...'
        aria-label='Filter'
        value={props.value}
        onChange={onChange}
      />
    </div>
  );
}

Filter.defaultProps = {
  onChange: () => {},
  value: ''
};

export default Filter;
