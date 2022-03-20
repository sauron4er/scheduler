import * as React from 'react';
import TextInput from 'templates/components/form_modules/text_input';
import SubmitButton from 'templates/components/form_modules/submit_button';
import {axiosPostRequest} from 'templates/components/axios_requests';
import PaginatedTable from 'templates/components/tables/paginated_table';

class Clients extends React.PureComponent {
  state = {
    id: 0,
    name: '',
    phone: '',
    address: '',
    note: '',
    new_name: '',
    new_phone: '',
    new_address: '',
    new_note: ''
  };

  onChange = (e, type) => {
    this.setState({[type]: e.target.value});
  };

  postNewClient = () => {
    const {new_name, new_phone, new_address, new_note} = this.state;
    let formData = new FormData();
    formData.append('id', '0');
    formData.append('name', new_name);
    formData.append('phone', new_phone);
    formData.append('address', new_address);
    formData.append('note', new_note);
    this.postClient(formData)
  };

  changeClient = () => {
    const {id, name, phone, address, note} = this.state;
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('note', note);
    this.postClient(formData)
  };

  postClient = (formData) => {
    axiosPostRequest('post_client', formData)
      .then((response) => {
        location.reload();
      })
      .catch((error) => notify(error));
  };

  onRowClick = (row) => {
    this.setState({
      id: row.id,
      name: row.name,
      phone: row.phone,
      address: row.address,
      note: row.note
    });
  };

  render() {
    const {id, name, phone, address, note, new_name, new_phone, new_address, new_note} = this.state;
    return (
      <div className='d-flex'>
        <div className='col-3'>
          <h5>Новий клієнт</h5>
          <hr/>
          <TextInput text={new_name} fieldName='Ім’я' onChange={(e) => this.onChange(e, 'new_name')} maxLength={100} />
          <hr />
          <TextInput text={new_phone} fieldName='Номер телефону' onChange={(e) => this.onChange(e, 'new_phone')} maxLength={10} />
          <hr />
          <TextInput text={new_address} fieldName='Адреса' onChange={(e) => this.onChange(e, 'new_address')} maxLength={100} />
          <hr />
          <TextInput text={new_note} fieldName='Нотатка' onChange={(e) => this.onChange(e, 'new_note')} maxLength={1000} />
          <SubmitButton text='Зберегти' onClick={this.postNewClient} disabled={!new_name} />
        </div>
        <div className='col-5'>
          <h5>Список клієнтів</h5>
          <hr/>
          <PaginatedTable url={`get_clients`} onRowClick={this.onRowClick} />
        </div>
        <div className='col-4'>
          <If condition={id}>
            <h5>Редагування</h5>
            <hr/>
            <TextInput text={name} fieldName='Ім’я' onChange={(e) => this.onChange(e, 'name')} maxLength={100} />
            <hr />
            <TextInput text={phone} fieldName='Номер телефону' onChange={(e) => this.onChange(e, 'phone')} maxLength={10} />
            <hr />
            <TextInput text={address} fieldName='Адреса' onChange={(e) => this.onChange(e, 'address')} maxLength={100} />
            <hr />
            <TextInput text={note} fieldName='Нотатка' onChange={(e) => this.onChange(e, 'note')} maxLength={1000} />
            <SubmitButton text='Зберегти' onClick={this.changeClient} disabled={!name} />
          </If>
        </div>
      </div>
    );
  }
}

export default Clients;
