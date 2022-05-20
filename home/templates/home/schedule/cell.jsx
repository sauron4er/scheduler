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

  function onVisitClick(e) {
    e.stopPropagation();
    console.log(1);
  }

  // TODO Чому візит записується на годину пізніше??

  return (
    <td className='scheduler_td' onClick={onClick}>
      <If condition={props.visits.length > 0}>
        <div className='visits_container' onClick={() => {}}>
          <For each='visit' of={props.visits} index='index'>
            <small key={index} className='visit' onClick={onVisitClick}>
              {`${visit.client.substring(0,5)}...`}
            </small>
          </For>
        </div>
      </If>
    </td>
  );
}

Cell.defaultProps = {
  day: '',
  time: [],
  visits: []
};

export default view(Cell);
