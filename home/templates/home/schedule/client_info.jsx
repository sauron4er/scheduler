import React, {useEffect} from 'react';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/state';
import 'static/css/schedule.css';
import useSetState from 'templates/hooks/useSetState';
import {Loader} from 'templates/components/form_modules/loaders';
import {axiosGetRequest, axiosPostRequest} from 'templates/components/axios_requests';
import ClientVisits from 'home/templates/home/schedule/popups/client_visits';

function ClientInfo(props) {
  const [state, setState] = useSetState({
    name: '',
    address: '',
    phone: '',
    note: '',
    future: [],
    past: [],
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

  return (
    <>
      <Choose>
        <When condition={state.loading}>
          <Loader />
        </When>
        <Otherwise>
          <div className='font-weight-bold'>{state.name}</div>
          <If condition={state.phone}>
            <div className='mb-1'>{state.phone}</div>
          </If>
          <If condition={state.address}>
            <div className='border-top border-bottom mb-1'>
              Адреса:
              <span className='font-italic'>{` ${state.address}`}</span>
            </div>
          </If>
          <If condition={state.note}>
            <div>Нотатка:</div>
            <div className='border rounded p-1 font-italic mb-1'>{state.note}</div>
          </If>

          <ClientVisits future={state.future} past={state.past} />
        </Otherwise>
      </Choose>
    </>
  );
}

export default view(ClientInfo);
