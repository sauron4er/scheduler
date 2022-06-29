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

function ClientModal(props) {
  const [state, setState] = useSetState({
    opened: false
  });

  useEffect(() => {
    if (props.opened) {
    }
  }, [props.opened]);

  function postNewVisit() {
    axiosGetRequest(`delete_visit${props.id}`)
      .then((response) => {})
      .catch((error) => notify(error));
  }

  function toggleModal() {
    setState({opened: !state.opened})
  }

  return (
    <>
      <button className={`btn btn-sm btn-outline-info mt-1 ${props.id ? 'visible' : 'invisible'}`} disabled={!props.id} onClick={toggleModal}>
        Інформація про клієнта
      </button>
      <Modal open={state.opened} onClose={toggleModal} style={{top: '8%', left: '35%'}}>
        <div className='modal-header'>
          <h5>{props.name}</h5>
        </div>
        <div className='modal-body'></div>
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
