import React, {useEffect} from 'react';
import {store, view} from '@risingstack/react-easy-state';
import useSetState from 'templates/hooks/useSetState';
import TextInput from 'templates/components/form_modules/text_input';
import SubmitButton from 'templates/components/form_modules/submit_button';
import {axiosPostRequest} from 'templates/components/axios_requests';
import Modal from 'templates/components/modal/modal';
import employeesState from 'home/templates/home/employees/state';
import ColorPicker from '../../../../templates/components/form_modules/color_picker';

function EditEmployee(props) {
  const [state, setState] = useSetState({
    id: 0,
    name: '',
    phone: '',
    address: '',
    note: '',
    color: '',
    login: '',
    password: ''
  });

  useEffect(() => {
    if (props.employee) {
      setState({...props.employee});
    }
  }, [props]);

  function onChange(e, type) {
    setState({[type]: e.target.value});
  }

  function changeEmployee() {
    const {id, name, phone, address, note, color} = state;
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('note', note);
    formData.append('color', color);
    postEmployee(formData);
  }

  function deactivateEmployee() {
    const {id, name, phone, address, note, color} = state;
    let formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('note', note);
    formData.append('color', color);
    formData.append('deactivate', '');
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

  function closeModal() {
    employeesState.editing_opened = false;
  }

  return (
    <Modal open={employeesState.editing_opened} onClose={closeModal}>
      <h5>Редагування</h5>
      <hr />
      <TextInput text={state.name} fieldName='Ім’я' onChange={(e) => onChange(e, 'name')} maxLength={100} />
      <hr />
      <div className='d-flex'>
        <TextInput
          className='mr-3'
          text={state.phone}
          fieldName='Номер телефону'
          onChange={(e) => onChange(e, 'phone')}
          maxLength={10}
        />
        <div className='ml-auto'>
          <ColorPicker color={state.color} fieldName='Колір' onChange={(e) => onChange(e, 'color')} />
        </div>
      </div>
      <hr />
      <TextInput text={state.address} fieldName='Адреса' onChange={(e) => onChange(e, 'address')} maxLength={100} />
      <hr />
      <TextInput text={state.note} fieldName='Нотатка' onChange={(e) => onChange(e, 'note')} maxLength={1000} />
      <hr />
      <TextInput text={state.login} fieldName='Логін' onChange={(e) => onChange(e, 'login')} maxLength={150} />
      <hr />
      <div>Пароль</div>
      <hr />
      <div>Тема</div>
      <hr />
      <div className='d-flex justify-content-between'>
        <SubmitButton name='change' text='Зберегти' onClick={changeEmployee} disabled={!state.name} />
        <SubmitButton name='deactivate' className='css_button_red' text='Видалити' onClick={deactivateEmployee} disabled={!state.name} />
      </div>
    </Modal>
  );
}

EditEmployee.defaultProps = {
  employee: {}
};

export default view(EditEmployee);
