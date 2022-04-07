import * as React from 'react';

class Selector extends React.Component {
  render() {
    const {list, selectedName, valueField, onChange, fieldName, disabled, className, selectId} = this.props;

    return (
      <div className={'form-inline' + className}>
        <If condition={fieldName}>
          <label htmlFor={selectId}>{fieldName}:</label>
        </If>
        <select
          className='form-control'
          id={selectId}
          name={fieldName}
          value={selectedName}
          onChange={onChange}
          disabled={disabled}
        >
          <option key={0} data-key={null} value='0'>
            ------------
          </option>
          {list.map((item) => {
            return (
              <option key={item.id} data-key={item.id} value={item[valueField]}>
                {item[valueField]}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  static defaultProps = {
    list: [],
    fieldName: '',
    valueField: 'name',
    selectedName: '',
    onChange: () => {},
    disabled: false,
    className: {},
    selectId: 'select'
  };
}

export default Selector;
