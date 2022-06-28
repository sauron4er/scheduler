import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import Modal from 'templates/components/modal/modal';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import SubmitButton from 'templates/components/form_modules/submit_button';
import AsyncSelector from 'templates/components/form_modules/selectors/async_selector';
import 'static/css/modal.css';
import TextInput from 'templates/components/form_modules/text_input';
import {axiosPostRequest} from 'templates/components/axios_requests';

function VisitModal(props) {
  const [state, setState] = useSetState({
    id: 0,
    client: 0,
    client_name: '',
    employee: 0,
    employee_name: '',
    employee_color: '',
    note: ''
  });

  useEffect(() => {
    if (props.opened && schedulerState.clicked_visit) {
      setState({
        id: schedulerState.clicked_visit.id,
        client: schedulerState.clicked_visit.client,
        client_name: schedulerState.clicked_visit.client_name,
        employee: schedulerState.clicked_visit.employee,
        employee_name: schedulerState.clicked_visit.employee_name,
        employee_color: schedulerState.clicked_visit.employee_color,
        note: schedulerState.clicked_visit.note
      });
    }
  }, [props.opened]);

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
    schedulerState.clicked_week = null;
    schedulerState.clicked_day = null;
    schedulerState.clicked_time = null;
    schedulerState.clicked_visit = null;
    setState({
      id: 0,
      client: 0,
      client_name: '',
      employee: 0,
      employee_name: '',
      employee_color: '',
      note: ''
    });
  }

  function postNewVisit() {
    const {id, client, employee, note} = state;
    let formData = new FormData();
    formData.append('id', id);
    formData.append('client', client);
    formData.append('employee', employee);
    formData.append('note', note);
    formData.append('start', `${schedulerState.clicked_day}, ${schedulerState.clicked_time}`);

    postVisit(formData);
  }

  function postVisit(formData) {
    axiosPostRequest('post_visit', formData)
      .then((response) => {
        const {client, client_name, employee, employee_name, employee_color, note} = state;
        const visit = {
          id: response,
          week: schedulerState.clicked_week,
          date: schedulerState.clicked_day,
          start: schedulerState.clicked_time,
          client,
          client_name,
          employee,
          employee_name,
          employee_color,
          note
        };

        state.id === 0 ? props.addVisit(visit) : props.changeVisit(visit);
        closeModal();
      })
      .catch((error) => notify(error));
  }

  return (
    <Modal open={props.opened} onClose={closeModal}>
      <div className='modal-header'>
        <h5>
          {state.client_name ? 'Прийом: ' : 'Новий прийом: '}
          {schedulerState.clicked_day} на {schedulerState.clicked_time}
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
        <small>Інфо про клієнта</small>
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

VisitModal.defaultProps = {
  opened: false,
  addVisit: () => {},
  changeVisit: () => {}
};

export default view(VisitModal);
