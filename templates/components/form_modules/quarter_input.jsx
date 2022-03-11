'use strict';
import * as React from 'react';

class QuarterInput extends React.Component {
  onQuarterChange = (e) => {
    if (['1', '2', '3', '4'].includes(e.target.value)) {
      this.props.onChange(e);
    }
  };

  onYearChange = (e) => {
    const year = parseInt(e.target.value);
    if (!isNaN(year)) this.props.onChange(e);
  };

  render() {
    const {quarter, year, disabled} = this.props;
    return (
      <div className='form-inline'>
        <label className='text-nowrap mr-lg-2 mt-1' htmlFor='quarter'>
          <div className='mr-1'>Квартал: </div>
          <input
            className='form-control'
            id='quarter'
            maxLength={1}
            max={4}
            value={quarter.quarter}
            size={1}
            onChange={this.onQuarterChange}
            disabled={disabled}
          />
        </label>

        <label className='text-nowrap mt-1' htmlFor='year'>
          <div className='mr-1'>Рік: </div>
          <input
            className='form-control'
            id='year'
            pattern='[0-9.]+'
            maxLength={4}
            value={quarter.year}
            size={4}
            onChange={this.onYearChange}
            disabled={disabled}
          />
        </label>
      </div>
    );
  }

  static defaultProps = {
    quarter: '',
    year: '',
    onChange: () => {},
    disabled: false
  };
}

export default QuarterInput;
