import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import EditEmployee from '../edit_employee';
import {axiosGetRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/react_toastify_settings';
import { Loader } from "templates/components/form_modules/loaders";
import 'css/profile.css'

function Profile() {
  const [state, setState] = useSetState({
    loading: true,
    employee: {}
  });

  useEffect(() => {
    axiosGetRequest(`get_employee/${window.user_id}/`)
      .then((response) => {
        setState({
          employee: response,
          loading: false
        });
      })
      .catch((error) => notify(error));
  }, [window.user_id]);

  function reload() {
    window.location.reload();
  }

  return (
    <div className='container css_profile_wrap'>
      <Choose>
        <When condition={!state.loading}>
          <EditEmployee employee={state.employee} reload={reload} is_staff={window.is_staff} />
        </When>
        <Otherwise>
          <Loader />
        </Otherwise>
      </Choose>
    </div>
  );
}

export default Profile;
