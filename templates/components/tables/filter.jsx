import React from 'react';

function Filter(props) {
  function onChange(e) {
    props.onChange(e.target.value);
  }

  return <input type='text' className='form-control mb-1' placeholder='Пошук...' aria-label='Filter' value={props.value} onChange={onChange} />;
}

Filter.defaultProps = {
  onChange: () => {},
  value: ''
};

export default Filter;
