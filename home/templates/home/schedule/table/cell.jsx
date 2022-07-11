import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import 'static/css/schedule.css';

function Cell(props) {
  const [state, setState] = useSetState({});

  function onClick() {
    schedulerState.clicked_week = props.week_number;
    schedulerState.clicked_day = props.day;
    schedulerState.clicked_time = props.time;
  }

  function onVisitClick(e, visit) {
    e.stopPropagation();
    schedulerState.clicked_week = props.week_number;
    schedulerState.clicked_day = props.day;
    schedulerState.clicked_time = props.time;
    schedulerState.clicked_visit = visit;
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

  function getVisitStyle(employee_color) {
    const is_color_dark = isEmployeeColorDark(employee_color);
    if (is_color_dark) {
      return {backgroundImage: `linear-gradient(to right, ${employee_color}, white)`, color: 'white'};
    } else {
      return {backgroundImage: `linear-gradient(to right, ${employee_color}, white)`, color: 'black'};
    }
  }

  function isEmployeeColorDark(hexcolor) {
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128;
    // return yiq >= 128 ? 'black' : 'white';
  }

  return (
    <td className='scheduler_td' onClick={onClick}>
      <If condition={props.visits.length > 0}>
        <div className='visits_container'>
          <For each='visit' of={props.visits} index='index'>
            <small
              key={index}
              className='visit'
              id={visit.id}
              data-info={JSON.stringify(visit)}
              onClick={(e) => onVisitClick(e, visit)}
              onMouseOver={onVisitHover}
              onMouseOut={onVisitHoverOut}
              // style={visit.employee_color ? {border: `1.5px solid ${visit.employee_color}`}: null}
              style={getVisitStyle(visit.employee_color)}
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
