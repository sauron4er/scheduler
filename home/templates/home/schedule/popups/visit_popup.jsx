import React, {useEffect} from 'react';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/state';
import 'static/css/schedule.css';

function VisitPopup(props) {
  useEffect(() => {
    if (schedulerState.hovered_visit) {
      const hovered_visit = document.getElementById(schedulerState.hovered_visit.id);
      const rect = hovered_visit.getBoundingClientRect();

      const el = $('#popup');
      el.css('position', 'fixed');
      el.css('left', rect.left);
      el.css('top', rect.top + 25);
      el.css('display', 'block');
    }
  }, [schedulerState.hovered_visit]);

  return (
    <div className='css_visit_popup' id='popup' style={{display: 'none'}}>
      <If condition={schedulerState.hovered_visit}>
        {schedulerState.hovered_visit.client_name}
        <If condition={schedulerState.hovered_visit.client_phone}>
          <div>
            <small>{schedulerState.hovered_visit.client_phone}</small>
          </div>
        </If>
        <If condition={schedulerState.hovered_visit.note}>
          <div>
            <small className='font-italic'>{schedulerState.hovered_visit.note}</small>
          </div>
        </If>
      </If>
    </div>
  );
}

export default view(VisitPopup);
