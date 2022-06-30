import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import Modal from 'templates/components/modal/modal';
import {store, view} from '@risingstack/react-easy-state';
import SubmitButton from 'templates/components/form_modules/submit_button';
import 'static/css/modal.css';
import TextInput from 'templates/components/form_modules/text_input';
import {axiosGetRequest, axiosPostRequest} from 'templates/components/axios_requests';
import {Loader} from 'templates/components/form_modules/loaders';
import clientsState from 'home/templates/home/clients/state';

function ClientModal(props) {
  const [state, setState] = useSetState({
    opened: false,
    loading: true,
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  useEffect(() => {
    if (state.opened) {
      axiosGetRequest(`get_client/${props.id}`)
        .then((response) => {
          setState({
            name: response.name,
            phone: response.phone,
            address: response.address,
            note: response.note,
            loading: false
          });
        })
        .catch((error) => notify(error));
    }
  }, [state.opened]);

  function openModal() {
    setState({opened: true});
  }

  function closeModal() {
    setState({
      opened: false,
      loading: true
    });
  }

  function onChange(e, type) {
    setState({[type]: e.target.value});
  }

  function changeClient() {
    const {id, name} = props;
    const {phone, address, note} = state;
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('note', note);

    axiosPostRequest('post_client', formData)
      .then((response) => {
        //TODO не закривати вікно а показувати loading, після чого галочку "збережено"
        //TODO  onPhoneChange
        props.onPhoneChange(id, phone)
      })
      .catch((error) => notify(error));
  }

  return (
    <>
      <button className={`btn btn-sm btn-outline-info mt-1 ${props.id ? 'visible' : 'invisible'}`} disabled={!props.id} onClick={openModal}>
        Інформація про клієнта
      </button>
      <Modal open={state.opened} onClose={closeModal} style={{top: '8%', left: '35%'}}>
        <div className='modal-header'>
          <h5>{props.name}</h5>
        </div>

        <Choose>
          <When condition={!state.loading}>
            <div className='modal-body'>
              <TextInput text={state.phone} fieldName='Номер телефону' onChange={(e) => onChange(e, 'phone')} maxLength={10} />
              <hr />
              <TextInput text={state.address} fieldName='Адреса' onChange={(e) => onChange(e, 'address')} maxLength={100} />
              <hr />
              <TextInput text={state.note} fieldName='Нотатка' onChange={(e) => onChange(e, 'note')} maxLength={1000} />
            </div>
            <div className='modal-footer'>
              <SubmitButton name='change' text='Зберегти' onClick={changeClient} disabled={!state.name} />
            </div>
          </When>
          <Otherwise>
            <Loader />
          </Otherwise>
        </Choose>

      </Modal>
    </>
  );
}

ClientModal.defaultProps = {
  id: 0,
  name: '',
  onPhoneChange: () => {}
};

export default view(ClientModal);
