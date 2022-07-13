import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/state';
import 'static/css/schedule.css';
import 'static/css/slider.css';
import {axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/react_toastify_settings';

function HeaderCell(props) {
  const [state, setState] = useSetState({
    is_holiday: props.day.is_holiday
  });

  function toggleHoliday() {
    let formData = new FormData();
    formData.append('is_holiday', !state.is_holiday);
    formData.append('date', props.day.date);
    axiosPostRequest(`toggle_holiday`, formData)
      .then((response) => {
        props.toggleHoliday(props.day.date, !state.is_holiday)
        setState({is_holiday: !state.is_holiday})
      })
      .catch((error) => notify(error));
  }

  return (
    <th scope='col' className={`${props.day.is_today ? 'th_today' : ''} scheduler_th`}>
      <div className='css_header_cell'>
        <div className='css_header_date'>Пн, {props.day.date}</div>
        <label className='css_switch' htmlFor={`chkbx_${props.day.date}`}>
          <input type='checkbox' id={`chkbx_${props.day.date}`} checked={!state.is_holiday} onChange={toggleHoliday} />
          <div className='css_slider css_round' />
        </label>
      </div>
    </th>
  );
}

HeaderCell.defaultProps = {
  week_number: 0,
  day: {},
  isToday: false,
  toggleHoliday: () => {}
};

export default view(HeaderCell);
