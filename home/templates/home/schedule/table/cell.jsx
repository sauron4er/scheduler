import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/state';
import 'static/css/schedule.css';

function Cell(props) {
  const [state, setState] = useSetState({});

  function onClick() {
    if (!props.day.is_holiday) {
      schedulerState.clicked_week = props.week_number;
      schedulerState.clicked_day = props.day.date;
      schedulerState.clicked_time = props.time;
    }
  }

  function onVisitClick(e, visit) {
    e.stopPropagation();
    schedulerState.clicked_week = props.week_number;
    schedulerState.clicked_day = props.day.date;
    schedulerState.clicked_time = props.time;
    schedulerState.clicked_visit = visit;
    schedulerState.selected_employee = visit.employee;
    schedulerState.selected_employee_name = visit.employee_name;
  }

  function onVisitHover(e) {
    e.stopPropagation();
    const visit = JSON.parse(e.target.dataset.info);
    schedulerState.hovered_visits_week = props.week_number;
    schedulerState.hovered_visit = visit;
    schedulerState.hover = schedulerState.hover + 1;

    const hovered_visit = document.getElementById(e.target.id);
    const rect = hovered_visit.getBoundingClientRect();

    const el = $('#popup');
    el.css('position', 'fixed');
    el.css('left', rect.left);
    el.css('top', rect.top + 25);
    el.css('display', 'block');
  }

  function onVisitHoverOut(e, client_name) {
    e.stopPropagation();
    schedulerState.hovered_visit = null;
    document.getElementById('popup').style.display = 'none';
  }

  function getTdClass() {
    let classes = props.day.is_holiday ? 'scheduler_holiday' : 'scheduler_td';
    if (schedulerState.today_string === props.day.date) classes += ' td_today';
    return classes;
  }

  return (
    <td className={getTdClass()} onClick={onClick}>
      <If condition={props.visits.length > 0}>
        <div className='visits_container'>
          <For each='visit' of={props.visits} index='index'>
            <small
              key={`work_day_${index}`}
              className='visit'
              id={visit.id}
              data-info={JSON.stringify(visit)}
              onClick={(e) => onVisitClick(e, visit)}
              onMouseOver={onVisitHover}
              onMouseOut={onVisitHoverOut}
              style={visit.employee_color ? {boxShadow: `${visit.employee_color} 1px 1.5px 2.6px`} : {border: `1px solid lightgrey`}}
            >
              {visit.client_name}
            </small>
          </For>
        </div>
      </If>
    </td>
  );
}

Cell.defaultProps = {
  week_number: 0,
  day: '',
  time: [],
  visits: []
};

export default view(Cell);
