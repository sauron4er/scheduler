import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import Modal from 'templates/components/modal/modal';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import SubmitButton from 'templates/components/form_modules/submit_button';
import AsyncSelector from 'templates/components/form_modules/selectors/async_selector';
import 'static/css/modal.css';
import TextInput from '../../../../templates/components/form_modules/text_input';
import {axiosPostRequest} from '../../../../templates/components/axios_requests';

function NewVisit() {
  const [state, setState] = useSetState({
    client: 0,
    client_name: '',
    employee: 0,
    employee_name: '',
    employee_color: '',
    note: ''
  });

  function onClientChange(e) {
    setState({
      client: e.id,
      client_name: e.name
    });
  }

  function onEmployeeChange(e) {
    setState({
      employee: e.id,
      employee_name: e.name,
      employee_color: e.color
    });
  }

  function onNoteChange(e) {
    setState({
      note: e.target.value
    });
  }

  function closeModal() {
    schedulerState.clicked_day = null;
    schedulerState.clicked_time = null;
    setState({
      client: 0,
      client_name: '',
      employee: 0,
      employee_name: '',
      employee_color: '',
      note: ''
    });
  }

  function getStartDayTime() {
    console.log(schedulerState.clicked_day);
    console.log(schedulerState.clicked_time);
    return ''
  }

  function postNewVisit() {
    const {client, employee, note} = state;
    let formData = new FormData();
    formData.append('id', '0');
    formData.append('client', client);
    formData.append('employee', employee);
    formData.append('note', note);
    formData.append('start', `${schedulerState.clicked_day}, ${schedulerState.clicked_time}`);

    postVisit(formData);
  }

  function postVisit(formData) {
    axiosPostRequest('post_visit', formData)
      .then((response) => {
        schedulerState.refresh = true;
        closeModal();
      })
      .catch((error) => notify(error));
  }

  return (
    <Modal open={schedulerState.clicked_time} onClose={closeModal}>
      <div className='modal-header'>
        <h5>
          Новий прийом: {schedulerState.clicked_day} на {schedulerState.clicked_time}
        </h5>
      </div>
      <div className='modal-body'>
        <AsyncSelector
          className='css_select_in_modal'
          fieldName='Клієнт'
          url='get_clients_select'
          onChange={onClientChange}
          value={{id: state.client, name: state.client_name}}
        />
        <hr />
        <AsyncSelector
          className='css_select_in_modal'
          fieldName='Спеціаліст'
          url='get_employees_select'
          onChange={onEmployeeChange}
          value={{id: state.employee, name: state.employee_name}}
          color={state.employee_color}
        />
        <hr />
        <TextInput text={state.note} fieldName='Нотатка' onChange={onNoteChange} maxLength={500} />
      </div>
      <div className='modal-footer'>
        <SubmitButton name='change' text='Зберегти' onClick={postNewVisit} disabled={!state.client || !state.employee} />
      </div>
    </Modal>
  );
}

export default view(NewVisit);
