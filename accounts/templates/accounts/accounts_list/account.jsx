import * as React from 'react';
import {axiosGetRequest, axiosPostRequest} from 'templates/components/axios_requests';
import {Loader} from 'templates/components/form_modules/loaders';
import TextInput from 'templates/components/form_modules/text_input';
import SubmitButton from 'templates/components/form_modules/submit_button';
import SelectorWithFilterAndAxios from 'templates/components/form_modules/selector_with_filter_and_axios';

class Account extends React.PureComponent {
  state = {
    id: 0,
    client_type: 0,
    client_type_name: '',
    legal_name: '',
    last_name: '',
    first_name: '',
    phone: '',
    mail: '',
    mail_valid: this.props.id > 0,
    edrpou: '',
    certificate_number: '',
    username: '',
    last_login: '',
    new_password: '',
    new_password_check: '',
    new_password_valid: false,
    loading: this.props.id > 0
  };

  componentDidMount() {
    if (this.props.id > 0) {
      axiosGetRequest(`get_account/${this.props.id}`)
        .then((response) => {
          this.setState({
            id: response.id,
            client_type: response.client_type,
            client_type_name: response.client_type_name,
            legal_name: response.legal_name,
            last_name: response.last_name,
            first_name: response.first_name,
            phone: response.phone,
            mail: response.email,
            edrpou: response.edrpou,
            certificate_number: response.certificate_number,
            username: response.username,
            last_login: response.last_login,
            loading: false
          });
        })
        .catch((error) => console.log(error));
    }
  }

  onTextFieldChange = (field, e) => {
    this.setState({[field]: e.target.value});
  };

  onSelectChange = (field, field_name, e) => {
    this.setState({
      [field]: e.id,
      [field_name]: e.name
    });
  };

  postAccount = () => {
    const {id, client_type, legal_name, last_name, first_name, phone, mail, edrpou, certificate_number, username, new_password} = this.state;

    let formData = new FormData();
    formData.append('client_type', client_type);
    formData.append('legal_name', legal_name);
    formData.append('last_name', last_name);
    formData.append('first_name', first_name);
    formData.append('phone', phone);
    formData.append('mail', mail);
    formData.append('edrpou', edrpou);
    formData.append('certificate_number', certificate_number);
    formData.append('username', username);
    formData.append('new_password', new_password);

    axiosPostRequest(`post_account/${id}`, formData)
      .then((response) => {
        location.reload();
      })
      .catch((error) => notify(error));
  };

  deactAccount = () => {
    axiosGetRequest(`deact_account/${this.props.id}`)
      .then((response) => {
        location.reload();
      })
      .catch((error) => notify(error));
  };

  validateMail = (email) => {
    this.setState({
      mail_valid: String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    });
  };

  changeMail = (e) => {
    this.validateMail(e.target.value);
    this.setState({mail: e.target.value});
  };

  validatePassword = (pass) => {
    this.setState({new_password_valid: pass.length > 7 && isNaN(pass)});
  };

  changePassword = (e) => {
    this.validatePassword(e.target.value);
    this.setState({new_password: e.target.value});
  };

  changePasswordCheck = (e) => {
    this.setState({new_password_check: e.target.value});
  };

  render() {
    const {id} = this.props;
    const {
      client_type,
      client_type_name,
      legal_name,
      last_name,
      first_name,
      phone,
      mail,
      mail_valid,
      edrpou,
      certificate_number,
      username,
      last_login,
      new_password,
      new_password_check,
      new_password_valid,
      loading
    } = this.state;

    return (
      <>
        <div className='modal-header'>
          <Choose>
            <When condition={id > 0}>
              <h4>Редагування акаунту</h4>
            </When>
            <Otherwise>
              <h4>Створення нового акаунту</h4>
            </Otherwise>
          </Choose>
        </div>
        <Choose>
          <When condition={!loading}>
            <div className='modal-body'>
              <div className='d-md-flex'>
                <div className='col-md-6'>
                  <TextInput
                    text={legal_name}
                    fieldName='Юридична назва'
                    onChange={(e) => this.onTextFieldChange('legal_name', e)}
                    maxLength={100}
                  />
                </div>
                <div className='col-md-6'>
                  <SelectorWithFilterAndAxios
                    listNameForUrl='client_types'
                    fieldName='Тип користувача'
                    selectId='client_type'
                    value={{name: client_type_name, id: client_type}}
                    onChange={(e) => this.onSelectChange('client_type', 'client_type_name', e)}
                  />
                </div>
              </div>
              <hr />
              <label className='ml-md-3' htmlFor='last_name'>
                Представник
              </label>
              <div className='d-md-flex'>
                <div className='col-md-6'>
                  <input
                    className='form-control'
                    name='last_name'
                    id='last_name'
                    value={last_name}
                    onChange={(e) => this.onTextFieldChange('last_name', e)}
                    maxLength={150}
                    placeholder='Прізвище'
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    className='form-control'
                    name='first_name'
                    id='first_name'
                    value={first_name}
                    onChange={(e) => this.onTextFieldChange('first_name', e)}
                    maxLength={150}
                    placeholder='Ім’я, по-батькові'
                  />
                </div>
              </div>
              <hr />
              <div className='d-md-flex'>
                <div className='col-md-6'>
                  <label htmlFor='mail'>Електронна пошта</label>
                  <input
                    className={`form-control ${
                      mail !== '' ? (mail_valid ? 'css_input_valid' : 'css_input_invalid') : null
                    }`}
                    name='mail'
                    id='mail'
                    type='email'
                    value={mail}
                    onChange={this.changeMail}
                    maxLength={150}
                    placeholder=''
                  />
                </div>
                <div className='col-md-6'>
                  <label htmlFor='phone'>Номер телефону</label>
                  <input
                    className='form-control'
                    name='phone'
                    id='phone'
                    value={phone}
                    onChange={(e) => this.onTextFieldChange('phone', e)}
                    maxLength={150}
                    placeholder=''
                  />
                </div>
              </div>
              <hr />
              <div className='d-md-flex'>
                <div className='col-md-6'>
                  <label htmlFor='edrpou'>ЄДРПОУ</label>
                  <input
                    className='form-control'
                    name='edrpou'
                    id='edrpou'
                    value={edrpou}
                    onChange={(e) => this.onTextFieldChange('edrpou', e)}
                    maxLength={8}
                    placeholder=''
                  />
                </div>
                <div className='col-md-6'>
                  <label htmlFor='pefc'>PEFC сертифікат</label>
                  <input
                    className='form-control'
                    name='pefc'
                    id='pefc'
                    value={certificate_number}
                    onChange={(e) => this.onTextFieldChange('certificate_number', e)}
                    maxLength={20}
                    placeholder=''
                  />
                </div>
              </div>
              <hr />
              <div className='d-md-flex'>
                <div className='col-md-12'>
                  <label htmlFor='username'>Логін</label>
                  <input
                    className='form-control'
                    name='username'
                    id='username'
                    value={username}
                    onChange={(e) => this.onTextFieldChange('username', e)}
                    maxLength={150}
                    placeholder=''
                  />
                  <small>Лише латинські букви, цифри та символи @, ., +, - або _</small>
                </div>
              </div>
              <hr />
              <div className='d-md-flex'>
                <div className='col-md-6'>
                  <label htmlFor='new_password'>Пароль:</label>
                  <input
                    className={`form-control ${
                      new_password !== '' ? (new_password_valid ? 'css_input_valid' : 'css_input_invalid') : null
                    }`}
                    name='new_password'
                    id='new_password'
                    type='password'
                    value={new_password}
                    onChange={this.changePassword}
                    minLength={8}
                    placeholder=''
                  />
                </div>
                <div className='col-md-6'>
                  <label htmlFor='new_password_check'>Пароль повторно:</label>
                  <input
                    className={`form-control ${
                      new_password !== '' ? (new_password_check === new_password ? 'css_input_valid' : 'css_input_invalid') : null
                    }`}
                    name='new_password_check'
                    id='new_password_check'
                    type='password'
                    value={new_password_check}
                    onChange={this.changePasswordCheck}
                    minLength={8}
                    placeholder=''
                  />
                </div>
              </div>
              <small className='ml-md-3 mb-1'>Мінімум 8 символів. Не може бути виключно цифровим</small>

              <div className='modal-footer'>
                <If condition={last_login}><small className='ml-auto'>Останній вхід: {last_login}</small></If>
                <SubmitButton
                  text='Зберегти'
                  onClick={this.postAccount}
                  disabled={
                    legal_name === '' ||
                    client_type === 0 ||
                    last_name === '' ||
                    first_name === '' ||
                    !mail_valid ||
                    username === '' ||
                    id <= 0 && !new_password ||
                    new_password && !new_password_valid ||
                    new_password && new_password !== new_password_check
                  }
                />
                <If condition={id > 0}>
                  <SubmitButton text='Деактивувати' onClick={this.deactAccount} />
                </If>
              </div>
            </div>
          </When>
          <Otherwise>
            <Loader />
          </Otherwise>
        </Choose>
      </>
    );
  }

  static defaultProps = {
    id: 0
  };
}

export default Account;
