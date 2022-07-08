import React, {useEffect} from 'react';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import 'static/css/schedule.css';

function ClientInfo(props) {
  useEffect(() => {
    if (schedulerState.clicked_visit.client !== 0) {
      const visit_modal = document.getElementById('visit_modal');
      const rect = visit_modal.getBoundingClientRect();

      const el = $('#client_info');
      el.css('position', 'fixed');
      el.css('left', rect.right + 1);
      el.css('top', rect.top);
      el.css('display', 'block');
    } else {
      const el = $('#client_info');
      el.css('display', 'none');
    }
  }, [schedulerState.clicked_visit.client]);

  return (
    <div className='css_client_info bg-danger' id={'client_info'}>
      !!!
    </div>
  );
}

export default view(ClientInfo);
