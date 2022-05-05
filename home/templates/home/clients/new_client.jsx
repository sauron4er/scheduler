import React from 'react';
import {store, view} from '@risingstack/react-easy-state';
import useSetState from 'templates/hooks/useSetState';
import TextInput from 'templates/components/form_modules/text_input';
import SubmitButton from 'templates/components/form_modules/submit_button';
import {axiosPostRequest} from 'templates/components/axios_requests';
import Modal from 'templates/components/modal/modal';
import clientsState from 'home/templates/home/clients/state';

function NewClient() {
  const [state, setState] = useSetState({
    new_name: '',
    new_phone: '',
    new_address: '',
    new_note: '',
    opened: false
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
    clientsState.new_client_name = new_name;
    postClient(formData);
  }

  function postClient(formData) {
    axiosPostRequest('post_client', formData)
      .then((response) => {
        clientsState.refresh = true;
        closeModal()
      })
      .catch((error) => notify(error));
  }

  function openModal() {
    clientsState.refresh = false;
    setState({opened: true});
  }

  function closeModal() {
    setState({
      opened: false,
      new_name: '',
      new_phone: '',
      new_address: '',
      new_note: '',
    });
  }

  return (
    <div className='mb-3'>
      <button className='css_button' onClick={openModal}>
        Новий клієнт
      </button>
      <Modal open={state.opened} onClose={closeModal}>
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
      </Modal>
    </div>
  );
}

export default view(NewClient);
