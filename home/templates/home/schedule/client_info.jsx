import React, {useEffect} from 'react';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/state';
import 'static/css/schedule.css';
import useSetState from 'templates/hooks/useSetState';
import {Loader} from 'templates/components/form_modules/loaders';
import {axiosGetRequest, axiosPostRequest} from 'templates/components/axios_requests';
import ClientVisits from 'home/templates/home/schedule/popups/client_visits';
import TextInput from 'templates/components/form_modules/text_input';
import SubmitButton from 'templates/components/form_modules/submit_button';
import { notify } from "templates/components/react_toastify_settings";

function ClientInfo(props) {
  const [state, setState] = useSetState({
    name: '',
    address: '',
    phone: '',
    note: '',
    future: [],
    past: [],
    button_text: 'Зберегти зміни',
    loading: true
  });

  useEffect(() => {
    if (schedulerState.clicked_visit.client !== 0) {
      getClientInfo();
    }
  }, [schedulerState.clicked_visit.client]);

  function getClientInfo() {
    axiosGetRequest(`get_client_for_scheduler/${schedulerState.clicked_visit.client}`)
      .then((response) => {
        setState({
          name: response.info.name,
          address: response.info.address,
          phone: response.info.phone,
          note: response.info.note,
          future: response.future,
          past: response.past,
          loading: false
        });
      })
      .catch((error) => notify(error));
  }

  function onChange(e, type) {
    setState({[type]: e.target.value});
  }

  function editClient() {
    let formData = new FormData();
    formData.append('id', schedulerState.clicked_visit.client);
    formData.append('name', state.name);
    formData.append('phone', state.phone);
    formData.append('address', state.address);
    formData.append('note', state.note);

    axiosPostRequest('post_client', formData)
      .then((response) => {
        if (response === schedulerState.clicked_visit.client) setState({button_text: 'Збережено'})
        else notify('Помилка!')
      })
      .catch((error) => notify(error));
  }
  
  useEffect(() => {
    if (state.button_text === 'Збережено') {
      const timer = setTimeout(() => {
        setState({button_text: 'Зберегти зміни'})
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.button_text])

  return (
    <>
      <Choose>
        <When condition={state.loading}>
          <Loader />
        </When>
        <Otherwise>
          <div className='css_modal_client_name'>{state.name}</div>
          <div className='d-flex'>
            <div className='col-6 pl-0'>
              <TextInput text={state.phone} fieldName='Номер телефону' onChange={(e) => onChange(e, 'phone')} maxLength={10} />
            </div>
            <div className='col-6 pr-0'>
              <TextInput text={state.address} fieldName='Адреса' onChange={(e) => onChange(e, 'address')} maxLength={100} />
            </div>
          </div>
          <TextInput text={state.note} fieldName='Нотатка' onChange={(e) => onChange(e, 'note')} maxLength={1000} />
          <SubmitButton text={state.button_text} onClick={editClient} timeout={3000} />
          <hr/>
          <ClientVisits future={state.future} past={state.past} />
        </Otherwise>
      </Choose>
    </>
  );
}

export default view(ClientInfo);
