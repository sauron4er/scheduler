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
    note: ''
  });

  useEffect(() => {
    if (props.opened) {
      if (schedulerState.clicked_visit?.id) {
        setState({
          id: schedulerState.clicked_visit.id,
          note: schedulerState.clicked_visit.note
        });
        schedulerState.selected_client = schedulerState.clicked_visit.client;
        schedulerState.selected_client_name = schedulerState.clicked_visit.client_name;
        schedulerState.selected_client_phone = schedulerState.clicked_visit.client_phone;
        schedulerState.selected_employee = schedulerState.clicked_visit.employee;
        schedulerState.selected_employee_name = schedulerState.clicked_visit.employee_name;
        schedulerState.selected_employee_color = schedulerState.clicked_visit.employee_color;
      } else {
        schedulerState.selected_employee = window.employee_id;
        schedulerState.selected_employee_name = window.employee_name;
        schedulerState.selected_employee_color = window.employee_color;
      }
    }
  }, [props.opened]);

  function onClientChange(e) {
    schedulerState.selected_client = e.id;
    schedulerState.selected_client_name = e.only_name;
    schedulerState.selected_client_phone = e.phone;
  }

  function onEmployeeChange(e) {
    schedulerState.selected_employee = e.id;
    schedulerState.selected_employee_name = e.name;
    schedulerState.selected_employee_color = e.color;
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
      note: ''
    });
  }

  function postNewVisit() {
    const {id, note} = state;
    let formData = new FormData();
    formData.append('id', id);
    formData.append('client', schedulerState.selected_client);
    formData.append('employee', schedulerState.selected_employee);
    formData.append('note', note);
    formData.append('start', `${schedulerState.clicked_day}, ${schedulerState.clicked_time}`);

    postVisit(formData);
  }

  function postVisit(formData) {
    axiosPostRequest('post_visit', formData)
      .then((response) => {
        const {note} = state;
        const {selected_client, selected_client_name, selected_client_phone,
          selected_employee, selected_employee_name, selected_employee_color} = schedulerState;
        const visit = {
          id: response,
          week: schedulerState.clicked_week,
          date: schedulerState.clicked_day,
          start: schedulerState.clicked_time,
          client: selected_client,
          client_name: selected_client_name,
          client_phone: selected_client_phone,
          employee: selected_employee,
          employee_name: selected_employee_name,
          employee_color: selected_employee_color,
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
    schedulerState.selected_client = new_client.id;
    schedulerState.selected_client_name = new_client.name;
    schedulerState.selected_client_phone = new_client.phone;
  }

  function mergeClientNameAndPhone() {
    if (schedulerState.selected_client_phone) {
      return schedulerState.selected_client_name + ', ' + schedulerState.selected_client_phone;
    } else {
      return schedulerState.selected_client_name;
    }
  }

  return (
    <Modal open={props.opened} onClose={closeModal} id='visit_modal' few_childs>
      <>
        <div className='modal-header'>
          <h5 className='css_modal_header'>{`Прийом: ${schedulerState.clicked_day} на ${schedulerState.clicked_time}`}</h5>
        </div>
        <div className='modal-body'>
          <AsyncSelector
            className='css_select_in_modal mb-1'
            fieldName='Клієнт'
            url='get_clients_select'
            onChange={onClientChange}
            value={{id: schedulerState.selected_client, name: mergeClientNameAndPhone()}}
            autofocus={true}
          />
          <NewClient returnNewClient={addNewClient} />
          <hr />
          <AsyncSelector
            className='css_select_in_modal'
            fieldName='Спеціаліст'
            url='get_employees_select'
            onChange={onEmployeeChange}
            value={{id: schedulerState.selected_employee, name: schedulerState.selected_employee_name}}
            color={schedulerState.selected_employee_color}
            disabled={!window.is_staff}
          />
          <hr />
          <TextInput text={state.note} fieldName='Нотатка' onChange={onNoteChange} maxLength={500} />
        </div>
        <div className='modal-footer'>
          <SubmitButton className='text-dark mr-auto' text='Видалити' onClick={deleteVisit} disabled={!state.id} />
          <SubmitButton text='Зберегти' onClick={postNewVisit} disabled={!schedulerState.selected_client} />
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
