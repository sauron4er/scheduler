import React, {useEffect} from 'react';
import {store, view} from '@risingstack/react-easy-state';
import useSetState from 'templates/hooks/useSetState';
import TextInput from 'templates/components/form_modules/text_input';
import SubmitButton from 'templates/components/form_modules/submit_button';
import {axiosPostRequest} from 'templates/components/axios_requests';
import Modal from 'templates/components/modal/modal';
import clientsState from 'home/templates/home/clients/state';

function EditClient(props) {
  const [state, setState] = useSetState({
    id: 0,
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  useEffect(() => {
    if (props.client) {
      setState({
        id: props.client.id,
        name: props.client.name,
        phone: props.client.phone,
        address: props.client.address,
        note: props.client.note
      });
    }
  }, [props]);

  function onChange(e, type) {
    setState({[type]: e.target.value});
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
        // location.reload();
        clientsState.refresh = true;
        closeModal()
      })
      .catch((error) => notify(error));
  }

  function closeModal() {
    clientsState.editing_opened = false;
  }

  return (
    <Modal open={clientsState.editing_opened} onClose={closeModal}>
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
    </Modal>
  );
}

EditClient.defaultProps = {
  client: {}
};

export default view(EditClient);
