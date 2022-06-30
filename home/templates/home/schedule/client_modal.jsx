import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import Modal from 'templates/components/modal/modal';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import SubmitButton from 'templates/components/form_modules/submit_button';
import AsyncSelector from 'templates/components/form_modules/selectors/async_selector';
import 'static/css/modal.css';
import TextInput from 'templates/components/form_modules/text_input';
import {axiosGetRequest, axiosPostRequest} from 'templates/components/axios_requests';
import {Loader} from '../../../../templates/components/form_modules/loaders';

function ClientModal(props) {
  const [state, setState] = useSetState({
    opened: false,
    loading: true,
    client: {}
  });

  useEffect(() => {
    if (state.opened) {
      axiosGetRequest(`get_client/${props.id}`)
        .then((response) => {
          setState({
            client: response,
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

  return (
    <>
      <button className={`btn btn-sm btn-outline-info mt-1 ${props.id ? 'visible' : 'invisible'}`} disabled={!props.id} onClick={openModal}>
        Інформація про клієнта
      </button>
      <Modal open={state.opened} onClose={closeModal} style={{top: '8%', left: '35%'}}>
        <div className='modal-header'>
          <h5>{props.name}</h5>
        </div>
        <div className='modal-body'>
          <Choose>
            <When condition={!state.loading}>
              <TextInput text={state.client.phone} fieldName='Номер телефону' onChange={(e) => onChange(e, 'phone')} maxLength={10} />
              <hr />
              <TextInput text={state.client.address} fieldName='Адреса' onChange={(e) => onChange(e, 'address')} maxLength={100} />
              <hr />
              <TextInput text={state.client.note} fieldName='Нотатка' onChange={(e) => onChange(e, 'note')} maxLength={1000} />
            </When>
            <Otherwise>
              <Loader />
            </Otherwise>
          </Choose>
        </div>
        <div className='modal-footer'></div>
      </Modal>
    </>
  );
}

ClientModal.defaultProps = {
  id: 0,
  name: ''
};

export default view(ClientModal);
