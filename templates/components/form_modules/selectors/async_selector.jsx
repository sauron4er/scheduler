import * as React from 'react';
import AsyncSelect from 'react-select/async';
import useSetState from 'templates/hooks/useSetState';
import {axiosGetRequest, axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/form_modules/modules_config';
import {Loader} from 'templates/components/form_modules/loaders';

function AsyncSelector(props) {
  const [state, setState] = useSetState({
    input_value: '',
    list: []
  });

  function loadOptions(input_value, callback) {
    let formData = new FormData();
    formData.append('filter', input_value);

    axiosPostRequest('get_clients_select', formData)
      .then((response) => {
        // setState({list: response});
        callback(response)
      })
      .catch((error) => notify(error));
  }

  function handleInputChange(newValue) {
    const input_value = newValue.replace(/\W/g, '');
    setState({ input_value });
    return input_value;
  }

  return (
    <div className={'css_full_width ' + props.className}>
      <If condition={props.fieldName}>
        <label className='mr-md-2' htmlFor={props.selectId}>
          {props.fieldName}:
        </label>
      </If>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={props.onChange}
        isDisabled={props.disabled}
        value={props.value}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
      />
    </div>
  );
}

AsyncSelector.defaultProps = {
  className: '',
  listNameForUrl: '',
  fieldName: '',
  valueField: 'name',
  selectedName: '',
  onChange: () => {},
  disabled: false,
  classes: {},
  value: {id: 0, name: ''},
  selectId: 'select'
};

export default AsyncSelector;
