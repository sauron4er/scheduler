import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import './schedule.css';
import Row from 'home/templates/home/schedule/row';

function Week(props) {
  const [state, setState] = useSetState({
    week_dates: [],
    visits: [],
    today_index: 0
  });

  useEffect(() => {
    switch (props.week_number) {
      case 1:
        setState({
          week_dates: schedulerState.first_week_dates,
          visits: schedulerState.visits.first_week
        });
        break;
      case 2:
        setState({
          week_dates: schedulerState.second_week_dates,
          visits: schedulerState.visits.second_week});
        break;
      case 3:
        setState({
          week_dates: schedulerState.third_week_dates,
          visits: schedulerState.visits.third_week});
        break;
    }
  }, [props.week_number]);

  useEffect(() => {
    getTodayInThisWeekIndex();
  }, [state.week_dates]);

  function getTodayInThisWeekIndex() {
    // TODO оновлення дати в 00:00 (якщо програму наприклад не закрили)
    const {week_dates} = state;

    let today_index = 0;
    for (let i = 0; i < week_dates.length; i++) {
      if (week_dates[i] === schedulerState.today_string) {
        today_index = i + 1;
      }
    }
    setState({today_index});
  }

  function getVisitsByTime(time) {
    let visits = []
    if (state.visits.length > 0 && time) {
      visits = state.visits.filter(visit => visit.start_time === time)
    }
    return visits
  }

  return (
    <>
      <table className='table table-sm scheduler'>
        <thead>
          <tr>
            <th scope='col' className='scheduler_th'></th>
            <th scope='col' className={`${state.today_index === 1 ? 'today' : ''} scheduler_th`}>
              Пн, {state.week_dates[0]}
            </th>
            <th scope='col' className={`${state.today_index === 2 ? 'today' : ''} scheduler_th`}>
              Вт, {state.week_dates[1]}
            </th>
            <th scope='col' className={`${state.today_index === 3 ? 'today' : ''} scheduler_th`}>
              Ср, {state.week_dates[2]}
            </th>
            <th scope='col' className={`${state.today_index === 4 ? 'today' : ''} scheduler_th`}>
              Чт, {state.week_dates[3]}
            </th>
            <th scope='col' className={`${state.today_index === 5 ? 'today' : ''} scheduler_th`}>
              Пт, {state.week_dates[4]}
            </th>
            <th scope='col' className={`${state.today_index === 6 ? 'today' : ''} scheduler_th`}>
              Сб, {state.week_dates[5]}
            </th>
            <th scope='col' className={`${state.today_index === 7 ? 'today' : ''} scheduler_th`}>
              Нд, {state.week_dates[6]}
            </th>
          </tr>
        </thead>
        <tbody>
          <Row visits={getVisitsByTime('8:00')} week={state.week_dates} time='8:00' />
          <Row visits={getVisitsByTime('9:00')} week={state.week_dates} time='9:00' />
          <Row visits={getVisitsByTime('10:00')} week={state.week_dates} time='10:00' />
          <Row visits={getVisitsByTime('11:00')} week={state.week_dates} time='11:00' />
          <Row visits={getVisitsByTime('12:00')} week={state.week_dates} time='12:00' />
          <Row visits={getVisitsByTime('13:00')} week={state.week_dates} time='13:00' />
          <Row visits={getVisitsByTime('14:00')} week={state.week_dates} time='14:00' />
          <Row visits={getVisitsByTime('15:00')} week={state.week_dates} time='15:00' />
          <Row visits={getVisitsByTime('16:00')} week={state.week_dates} time='16:00' />
          <Row visits={getVisitsByTime('17:00')} week={state.week_dates} time='17:00' />
          <Row visits={getVisitsByTime('18:00')} week={state.week_dates} time='18:00' />
        </tbody>
      </table>
    </>
  );
}

Week.defaultProps = {
  week_number: 0
};

export default view(Week);
