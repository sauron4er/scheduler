import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/state';
import 'static/css/schedule.css';
import 'static/css/slider.css';
import {axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/react_toastify_settings';
import HeaderCell from 'home/templates/home/schedule/table/header_cell';

function Header(props) {
  const [state, setState] = useSetState({
    week_dates: [],
    visits: [],
    today_index: 0,
  });

  return (
    <tr>
      <th scope='col' className='scheduler_time scheduler_time_header'>Time</th>
      <HeaderCell week_number={props.week_number} day={props.week_dates[0]} toggleHoliday={props.toggleHoliday}  />
      <HeaderCell week_number={props.week_number} day={props.week_dates[1]} toggleHoliday={props.toggleHoliday}  />
      <HeaderCell week_number={props.week_number} day={props.week_dates[2]} toggleHoliday={props.toggleHoliday}  />
      <HeaderCell week_number={props.week_number} day={props.week_dates[3]} toggleHoliday={props.toggleHoliday}  />
      <HeaderCell week_number={props.week_number} day={props.week_dates[4]} toggleHoliday={props.toggleHoliday}  />
      <HeaderCell week_number={props.week_number} day={props.week_dates[5]} toggleHoliday={props.toggleHoliday}  />
      <HeaderCell week_number={props.week_number} day={props.week_dates[6]} toggleHoliday={props.toggleHoliday}  />
    </tr>
  );
}

Header.defaultProps = {
  week_number: 0,
  week_dates: []
};

export default view(Header);
