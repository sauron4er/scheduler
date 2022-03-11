import * as React from 'react';

class QuantityInput extends React.Component {
  onQuantityChange = (e) => {
    const regex = new RegExp('^[0-9]{0,7}([.,][0-9]{0,3})?$');
    const quantity_is_correct = regex.test(e.target.value);
    if (quantity_is_correct) {
      this.props.onChange(e.target.value);
    }
  };

  render() {
    const {quantity, measurement, fieldName, disabled} = this.props;

    return (
      <div className='form-inline'>
        <label className='text-nowrap' htmlFor={fieldName + '_id'}>
          {`${fieldName}:`}
        </label>
        <input
          className='form-control mx-1'
          type='text'
          id={fieldName + '_id'}
          value={quantity}
          onChange={this.onQuantityChange}
          title='Число, не більше 3 цифр після коми.'
          disabled={disabled}
        />
        <If condition={measurement}>
          <span>{measurement}</span>
        </If>
      </div>
    );
  }

  static defaultProps = {
    quantity: null,
    fieldName: '-',
    measurement: '',
    onChange: () => {},
    disabled: false,
    className: {}
  };
}

export default QuantityInput;
