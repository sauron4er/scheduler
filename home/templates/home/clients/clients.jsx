import React from 'react';
import useSetState from 'templates/hooks/useSetState';
import TextInput from 'templates/components/form_modules/text_input';
import SubmitButton from 'templates/components/form_modules/submit_button';
import {axiosPostRequest} from 'templates/components/axios_requests';
import PaginatedTable from 'templates/components/tables/paginated_table';

function Clients() {
  const [state, setState] = useSetState({
    id: 0,
    name: '',
    phone: '',
    address: '',
    note: '',
    new_name: '',
    new_phone: '',
    new_address: '',
    new_note: ''
  });

  function onChange(e, type) {
    setState({[type]: e.target.value});
  }

  function postNewClient() {
    const {new_name, new_phone, new_address, new_note} = state;
    let formData = new FormData();
    formData.append('id', '0');
    formData.append('name', new_name);
    formData.append('phone', new_phone);
    formData.append('address', new_address);
    formData.append('note', new_note);
    postClient(formData);
  }

  function changeClient() {
    const {id, name, phone, address, note} = state;
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('note', note);
    postClient(formData);
  }

  function deactivateClient() {
    const {id, name, phone, address, note} = state;
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('note', note);
    formData.append('deactivate', '');
    postClient(formData);
  }

  function postClient(formData) {
    axiosPostRequest('post_client', formData)
      .then((response) => {
        location.reload();
      })
      .catch((error) => notify(error));
  }

  function onRowClick(row) {
    setState({
      id: row.id,
      name: row.name,
      phone: row.phone,
      address: row.address,
      note: row.note
    });
  }

  //TODO не оновлювати сторінку після додавання-редагування, а вносити зміни у таблицю напряму.

  return (
    <div className='d-flex'>
      <div className='col-lg-3'>
        <h5>Новий клієнт</h5>
        <hr />
        <TextInput text={state.new_name} fieldName='Ім’я' onChange={(e) => onChange(e, 'new_name')} maxLength={100} />
        <hr />
        <TextInput text={state.new_phone} fieldName='Номер телефону' onChange={(e) => onChange(e, 'new_phone')} maxLength={10} />
        <hr />
        <TextInput text={state.new_address} fieldName='Адреса' onChange={(e) => onChange(e, 'new_address')} maxLength={100} />
        <hr />
        <TextInput text={state.new_note} fieldName='Нотатка' onChange={(e) => onChange(e, 'new_note')} maxLength={1000} />
        <SubmitButton text='Зберегти' onClick={postNewClient} disabled={!state.new_name} />
      </div>
      <div className='col-lg-5'>
        <h5>Список клієнтів</h5>
        <hr />
        <PaginatedTable url={`get_clients`} onRowClick={onRowClick} colWidth={colWidth} />
      </div>
      <div className='col-lg-4'>
        <If condition={state.id}>
          <h5>Редагування</h5>
          <hr />
          <TextInput text={state.name} fieldName='Ім’я' onChange={(e) => onChange(e, 'name')} maxLength={100} />
          <hr />
          <TextInput text={state.phone} fieldName='Номер телефону' onChange={(e) => onChange(e, 'phone')} maxLength={10} />
          <hr />
          <TextInput text={state.address} fieldName='Адреса' onChange={(e) => onChange(e, 'address')} maxLength={100} />
          <hr />
          <TextInput text={state.note} fieldName='Нотатка' onChange={(e) => onChange(e, 'note')} maxLength={1000} />
          <div className='d-flex justify-content-between'>
            <SubmitButton name='change' text='Зберегти' onClick={changeClient} disabled={!state.name} />
            <SubmitButton name='deactivate' className='css_button_red' text='Видалити' onClick={deactivateClient} disabled={!state.name} />
          </div>
        </If>
      </div>
    </div>
  );
}

const colWidth = [{label: 'name', width: '50%'}, {label: 'phone', width: '110px'}]

export default Clients;
