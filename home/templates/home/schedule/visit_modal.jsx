import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import Modal from 'templates/components/modal/modal';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/state';
import SubmitButton from 'templates/components/form_modules/submit_button';
import AsyncSelector from 'templates/components/form_modules/selectors/async_selector';
import 'static/css/modal.css';
import TextInput from 'templates/components/form_modules/text_input';
import {axiosGetRequest, axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/react_toastify_settings';
import ClientInfo from 'home/templates/home/schedule/client_info';
import NewClient from '../clients/new_client';

function VisitModal(props) {
  const [state, setState] = useSetState({
    id: 0,
    client: 0,
    client_name: '',
    client_phone: '',
    client_name_phone: '',
    employee: 0,
    employee_name: '',
    employee_color: '',
    note: ''
  });

  function mergeClientNameAndPhone() {
    if (schedulerState.clicked_visit.client_phone) {
      return schedulerState.clicked_visit.client_name + ', ' + schedulerState.clicked_visit.client_phone;
    } else {
      return schedulerState.clicked_visit.client_name;
    }
  }

  useEffect(() => {
    if (props.opened && schedulerState.clicked_visit?.id) {
      setState({
        id: schedulerState.clicked_visit.id,
        client: schedulerState.clicked_visit.client,
        client_name: schedulerState.clicked_visit.client_name,
        client_phone: schedulerState.clicked_visit.client_phone,
        client_name_and_phone: mergeClientNameAndPhone(),
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
      client_name: e.only_name,
      client_phone: e.phone,
      client_name_and_phone: e.name
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
    setState({note: e.target.value});
  }

  function closeModal() {
    schedulerState.clicked_week = null;
    schedulerState.clicked_day = null;
    schedulerState.clicked_time = null;
    schedulerState.clicked_visit = {
      client: 0
    };
    setState({
      id: 0,
      client: 0,
      client_name: '',
      client_phone: '',
      client_name_and_phone: '',
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
        const {client, client_name, client_phone, employee, employee_name, employee_color, note} = state;
        const visit = {
          id: response,
          week: schedulerState.clicked_week,
          date: schedulerState.clicked_day,
          start: schedulerState.clicked_time,
          client: client,
          client_name,
          client_phone,
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

  function deleteVisit() {
    axiosGetRequest(`del_visit/${state.id}`)
      .then((response) => {
        props.removeVisit(state.id);
        closeModal();
      })
      .catch((error) => {
        notify('Щось пішло не так');
      });
  }

  function addNewClient(new_client) {
    console.log(new_client.id);
    setState({
      client: new_client.id,
      client_name: new_client.name,
      client_phone: new_client.phone,
      client_name_and_phone: new_client.phone ? new_client.name + ', ' + new_client.phone : new_client.name
    });
  }

  return (
    <Modal open={props.opened} onClose={closeModal} id='visit_modal' few_childs={true}>
      <>
        <div className='modal-header'>
          <h5>{`Прийом: ${schedulerState.clicked_day} на ${schedulerState.clicked_time}`}</h5>
        </div>
        <div className='modal-body'>
          <AsyncSelector
            className='css_select_in_modal mb-1'
            fieldName='Клієнт'
            url='get_clients_select'
            onChange={onClientChange}
            value={{id: state.client, name: state.client_name_and_phone}}
            autofocus={true}
          />
          <NewClient returnNewClient={addNewClient} />
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
          <SubmitButton className='text-dark mr-auto' text='Видалити' onClick={deleteVisit} disabled={!state.id} />
          <SubmitButton text='Зберегти' onClick={postNewVisit} disabled={!state.client} />
        </div>
      </>

      <If condition={schedulerState.clicked_visit?.client}>
        <ClientInfo />
      </If>
    </Modal>
  );
}

VisitModal.defaultProps = {
  opened: false,
  addVisit: () => {},
  changeVisit: () => {},
  removeVisit: () => {}
};

export default view(VisitModal);
