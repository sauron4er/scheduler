import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import './schedule.css';
import Row from 'home/templates/home/schedule/row';

function Week(props) {
  const [state, setState] = useSetState({
    today_index: 0
  });

  useEffect(() => {});

  useEffect(() => {
    getTodayInThisWeekIndex();
  }, [props.week]);

  useEffect(() => {
    getVisits();
    getDoctors();
  }, []);

  function getVisits() {}

  function getDoctors() {}

  function getTodayInThisWeekIndex() {
    // TODO оновлення дати в 00:00 (якщо програму наприклад не закрили)
    const {week} = props;

    let today_index = 0;
    for (let i = 0; i < week.length; i++) {
      if (week[i] === schedulerState.today_string) {
        today_index = i + 1;
      }
    }
    console.log(today_index);
    setState({today_index});
  }

  return (
    <>
      <table className='table table-sm scheduler'>
        <thead>
          <tr>
            <th scope='col' className='scheduler_th'></th>
            <th scope='col' className={`${state.today_index === 1 ? 'today' : ''} scheduler_th`}>
              Пн, {props.week[0]}
            </th>
            <th scope='col' className={`${state.today_index === 2 ? 'today' : ''} scheduler_th`}>
              Вт, {props.week[1]}
            </th>
            <th scope='col' className={`${state.today_index === 3 ? 'today' : ''} scheduler_th`}>
              Ср, {props.week[2]}
            </th>
            <th scope='col' className={`${state.today_index === 4 ? 'today' : ''} scheduler_th`}>
              Чт, {props.week[3]}
            </th>
            <th scope='col' className={`${state.today_index === 5 ? 'today' : ''} scheduler_th`}>
              Пт, {props.week[4]}
            </th>
            <th scope='col' className={`${state.today_index === 6 ? 'today' : ''} scheduler_th`}>
              Сб, {props.week[5]}
            </th>
            <th scope='col' className={`${state.today_index === 7 ? 'today' : ''} scheduler_th`}>
              Нд, {props.week[6]}
            </th>
          </tr>
        </thead>
        <tbody>
          <Row week={props.week} time='8:00' />
          <Row week={props.week} time='9:00' />
          <Row week={props.week} time='10:00' />
          <Row week={props.week} time='11:00' />
          <Row week={props.week} time='12:00' />
          <Row week={props.week} time='13:00' />
          <Row week={props.week} time='14:00' />
          <Row week={props.week} time='15:00' />
          <Row week={props.week} time='16:00' />
          <Row week={props.week} time='17:00' />
          <Row week={props.week} time='18:00' />
        </tbody>
      </table>
    </>
  );
}

Week.defaultProps = {
  week: []
};

export default view(Week);
