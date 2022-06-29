import React, {useEffect} from 'react';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import './schedule.css';

function VisitPopup(props) {
  useEffect(() => {
    const popup = document.getElementById('popup')
    const rect = popup.getBoundingClientRect();
    console.log('popup: ' + rect.top)
  }, [schedulerState.hover])

  return (
    <div className='css_visit_popup' id='popup' style={{display: 'none'}}>
        {schedulerState.hovered_visits_client_name}
        <If condition={schedulerState.hovered_visits_client_phone}>
          <div>
            <small>{schedulerState.hovered_visits_client_phone}</small>
          </div>
        </If>
        <If condition={schedulerState.hovered_visits_note}>
          <div>
            <small className='font-italic'>{schedulerState.hovered_visits_note}</small>
          </div>
        </If>
      </div>
  );
}

export default view(VisitPopup);
