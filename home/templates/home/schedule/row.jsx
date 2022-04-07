import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import './schedule.css';
import Cell from 'home/templates/home/schedule/cell';

function Row(props) {
  const [state, setState] = useSetState({});

  return (
    <tr>
      <td className='time'>{props.time}</td>
      <Cell day={props.week[0]} time={props.time} />
      <Cell day={props.week[1]} time={props.time} />
      <Cell day={props.week[2]} time={props.time} />
      <Cell day={props.week[3]} time={props.time} />
      <Cell day={props.week[4]} time={props.time} />
      <Cell day={props.week[5]} time={props.time} />
      <Cell day={props.week[6]} time={props.time} />
    </tr>
  );
}

Row.defaultProps = {
  week: [],
  props: ''
};

export default view(Row);
