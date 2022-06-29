import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import '../../../../static/css/schedule.css';
import Cell from 'home/templates/home/schedule/cell';

function Row(props) {
  const [state, setState] = useSetState({

  });

  function getVisitsByDay(day) {
    let visits = []
    if (props.visits && day) {
      visits = props.visits.filter(visit => visit.date === day)
    }
    return visits
  }

  return (
    <tr>
      <td className='time'>{props.time}</td>
      <Cell week_number={props.week_number} day={props.week[0]} time={props.time} visits={getVisitsByDay(props.week[0])} />
      <Cell week_number={props.week_number} day={props.week[1]} time={props.time} visits={getVisitsByDay(props.week[1])} />
      <Cell week_number={props.week_number} day={props.week[2]} time={props.time} visits={getVisitsByDay(props.week[2])} />
      <Cell week_number={props.week_number} day={props.week[3]} time={props.time} visits={getVisitsByDay(props.week[3])} />
      <Cell week_number={props.week_number} day={props.week[4]} time={props.time} visits={getVisitsByDay(props.week[4])} />
      <Cell week_number={props.week_number} day={props.week[5]} time={props.time} visits={getVisitsByDay(props.week[5])} />
      <Cell week_number={props.week_number} day={props.week[6]} time={props.time} visits={getVisitsByDay(props.week[6])} />
    </tr>
  );
}

Row.defaultProps = {
  week_number: 0,
  week: [],
  visits: [],
  time: ''
};

export default view(Row);
