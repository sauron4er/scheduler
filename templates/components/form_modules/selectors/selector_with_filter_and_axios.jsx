import * as React from 'react';
import Select from 'react-select';
import {axiosGetRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/form_modules/modules_config';
import { Loader } from "templates/components/form_modules/loaders";

class SelectorWithFilterAndAxios extends React.Component {
  // Якщо загорнуте в компонент-обгорту, викидує помилку Can't perform a React state update on an unmounted component
  state = {
    list: [],
    loading: true
  };

  componentDidMount() {
    axiosGetRequest(`get_${this.props.listNameForUrl}'`)
      .then((response) => {
        this.setState({
          list: response,
          loading: false
        });
      })
      .catch((error) => notify(error));
  }

  render() {
    const {onChange, fieldName, disabled, className, value, selectId} = this.props;
    const {loading, list} = this.state;

    return (
      <Choose>
        <When condition={!loading}>
          <div className={'css_full_width ' + className}>
            <If condition={fieldName}>
              <label className='mr-md-2' htmlFor={selectId}>{fieldName}:</label>
            </If>
            <Select
              options={list}
              onChange={onChange}
              isDisabled={disabled}
              value={value}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
            />
          </div>
        </When>
        <Otherwise>
          <Loader />
        </Otherwise>
      </Choose>
    );
  }

  static defaultProps = {
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
}

export default SelectorWithFilterAndAxios;
