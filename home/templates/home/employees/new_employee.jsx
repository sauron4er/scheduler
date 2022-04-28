import React from 'react';
import {store, view} from '@risingstack/react-easy-state';
import useSetState from 'templates/hooks/useSetState';
import TextInput from 'templates/components/form_modules/text_input';
import SubmitButton from 'templates/components/form_modules/submit_button';
import {axiosPostRequest} from 'templates/components/axios_requests';
import Modal from 'templates/components/modal/modal';
import employeesState from 'home/templates/home/employees/state';
import ColorPicker from '../../../../templates/components/form_modules/color_picker';

function NewEmployee() {
  const [state, setState] = useSetState({
    id: 0,
    new_name: '',
    new_phone: '',
    new_address: '',
    new_note: '',
    new_color: '#ffffff',
    opened: false
  });

  function onChange(e, type) {
    setState({[type]: e.target.value});
  }

  function postNewEmployee() {
    const {new_name, new_phone, new_address, new_note, new_color} = state;
    let formData = new FormData();
    formData.append('id', '0');
    formData.append('name', new_name);
    formData.append('phone', new_phone);
    formData.append('address', new_address);
    formData.append('note', new_note);
    formData.append('color', new_color);
    employeesState.new_employee_name = new_name;
    postEmployee(formData);
  }

  function postEmployee(formData) {
    axiosPostRequest('post_employee', formData)
      .then((response) => {
        employeesState.refresh = true;
        closeModal();
      })
      .catch((error) => notify(error));
  }

  function openModal() {
    employeesState.refresh = false;
    setState({opened: true});
  }

  function closeModal() {
    setState({opened: false});
  }

  return (
    <div className='mb-3'>
      <button className='css_button' onClick={openModal}>
        Новий спеціаліст
      </button>
      <Modal open={state.opened} onClose={closeModal}>
        <h5>Новий спеціаліст</h5>
        <hr />
        <TextInput text={state.new_name} fieldName='Ім’я' onChange={(e) => onChange(e, 'new_name')} maxLength={100} />
        <hr />
        <div className='d-flex'>
          <TextInput
            className='mr-3'
            text={state.new_phone}
            fieldName='Номер телефону'
            onChange={(e) => onChange(e, 'new_phone')}
            maxLength={10}
          />
          <div className='ml-auto'>
            <ColorPicker color={state.new_color} fieldName='Колір' onChange={(e) => onChange(e, 'new_color')} />
          </div>
        </div>
        <hr />
        <TextInput text={state.new_address} fieldName='Адреса' onChange={(e) => onChange(e, 'new_address')} maxLength={100} />
        <hr />
        <TextInput text={state.new_note} fieldName='Нотатка' onChange={(e) => onChange(e, 'new_note')} maxLength={1000} />
        <hr />
        <div>Початок і кінець роботи</div>
        {/*<TextInput text={state.new_note} fieldName='Колір!!!!!!!!!!!!!!!!!!!' onChange={(e) => onChange(e, 'new_note')} maxLength={1000} />*/}
        <SubmitButton text='Зберегти' onClick={postNewEmployee} disabled={!state.new_name} />
      </Modal>
    </div>
  );
}

export default view(NewEmployee);
