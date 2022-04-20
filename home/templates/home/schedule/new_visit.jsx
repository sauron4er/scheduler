import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import Modal from 'templates/components/modal/modal';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import SubmitButton from 'templates/components/form_modules/submit_button';
import AsyncSelector from 'templates/components/form_modules/selectors/async_selector';

//TODO Зробити так, щоб зміни, внесені на одному компі, відразу відображалися і на другому

function NewVisit() {
  const [state, setState] = useSetState({
    client: 0,
    client_name: ''
  });

  function onClientChange(e) {
    setState({
      client: e.id,
      client_name: e.name
    });
  }

  function closeModal() {
    schedulerState.clicked_day = null;
    schedulerState.clicked_time = null;
    setState({
      client: 0,
      client_name: ''
    });
  }

  function addVisit() {}

  return (
    <Modal open={schedulerState.clicked_time} onClose={closeModal}>
      <div className='modal-header'>
        <h5>
          Новий прийом: {schedulerState.clicked_day} на {schedulerState.clicked_time}
        </h5>
      </div>
      <div className='modal-body'>
        <AsyncSelector
          fieldName='Клієнт'
          url='get_clients_select'
          onChange={onClientChange}
          value={{id: state.client, name: state.client_name}}
        />
      </div>
      <div className='modal-footer'>
        <SubmitButton name='change' text='Зберегти' onClick={addVisit} disabled={false} />
      </div>
    </Modal>
  );
}

export default view(NewVisit);
