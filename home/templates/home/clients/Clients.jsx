import React, {useState} from 'react';
import PaginatedTable from 'templates/components/tables/paginated_table';
import TextInput from 'templates/components/form_modules/text_input';
import SubmitButton from 'templates/components/form_modules/submit_button';
import {axiosPostRequest} from 'templates/components/axios_requests';

function Clients(props) {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newNote, setNewNote] = useState('');

  function onNewClientChange(e, type) {
    switch (type) {
      case 'new_client_name':
        setNewName(e.target.value);
        break;
      case 'new_client_phone':
        setNewPhone(e.target.value);
        break;
      case 'new_client_address':
        setNewAddress(e.target.value);
        break;
      case 'new_client_note':
        setNewNote(e.target.value);
        break;
    }
  }

  function onClientChange(e, type) {
    switch (type) {
      case 'name':
        setName(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      case 'note':
        setNote(e.target.value);
        break;
    }
  }

  function postNewClient() {
    let formData = new FormData();
    formData.append('name', newName);
    formData.append('phone', newPhone);
    formData.append('address', newAddress);
    formData.append('note', newNote);

    axiosPostRequest('post_new_client', formData)
      .then((response) => {
        location.reload();
      })
      .catch((error) => notify(error));
  }

  function changeClient() {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('note', note);

    axiosPostRequest('change_client', formData)
      .then((response) => {
        location.reload();
      })
      .catch((error) => notify(error));
  }

  function onRowClick(row) {
    setId(row.id);
    setName(row.name);
    setPhone(row.phone);
    setAddress(row.address);
    setNote(row.note);
  }

  return (
    <div className='d-flex'>
      <div className='col-3'>
        <h5>Новий клієнт</h5>
        <TextInput text={newName} fieldName='Ім’я' onChange={(e) => onNewClientChange(e, 'new_client_name')} maxLength={100} />
        <hr />
        <TextInput text={newPhone} fieldName='Номер телефону' onChange={(e) => onNewClientChange(e, 'new_client_phone')} maxLength={10} />
        <hr />
        <TextInput text={newAddress} fieldName='Адреса' onChange={(e) => onNewClientChange(e, 'new_client_address')} maxLength={100} />
        <hr />
        <TextInput text={newNote} fieldName='Нотатка' onChange={(e) => onNewClientChange(e, 'new_client_note')} maxLength={1000} />
        <SubmitButton text='Зберегти' onClick={postNewClient} disabled={!newName} />
      </div>
      <div className='col-5'>
        <PaginatedTable
          url={`get_clients`}
          columns={columns}
          defaultSorting={[{columnName: 'name', direction: 'desc'}]}
          colWidth={col_width}
          onRowClick={onRowClick}
          height='800px'
          filter
          attentionColumn={true}
        />
      </div>
      <div className='col-4'>
        <If condition={id}>
          <TextInput text={name} fieldName='Ім’я' onChange={(e) => onClientChange(e, 'name')} maxLength={100} />
          <hr />
          <TextInput text={phone} fieldName='Номер телефону' onChange={(e) => onClientChange(e, 'phone')} maxLength={10} />
          <hr />
          <TextInput text={address} fieldName='Адреса' onChange={(e) => onClientChange(e, 'address')} maxLength={100} />
          <hr />
          <TextInput text={note} fieldName='Нотатка' onChange={(e) => onClientChange(e, 'note')} maxLength={1000} />
          <SubmitButton text='Зберегти' onClick={changeClient} disabled={!name} />
        </If>
      </div>
    </div>
  );
}

export default Clients;

const columns = [
  {name: 'name', title: 'Ім’я'},
  {name: 'phone', title: 'Телефон'},
  {name: 'address', title: 'Адреса'}
];

const col_width = [
  {columnName: 'phone', width: 100},
  {columnName: 'address', width: 200}
];
