import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import './schedule.css';


function Cell(props) {
  const [state, setState] = useSetState({});

  function onClick() {
    schedulerState.clicked_day = props.day;
    schedulerState.clicked_time = props.time;
  }

  return <td className='scheduler_td' onClick={onClick}>
    <If condition={props.visits.length > 0}>!</If>
  </td>;
}

Cell.defaultProps = {
  day: '',
  time: [],
  visits: []
};

export default view(Cell);
