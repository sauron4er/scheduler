import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import './schedule.css';
import Row from 'home/templates/home/schedule/row';
import {axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/form_modules/modules_config';
import {Loader} from "templates/components/form_modules/loaders";

function Week(props) {
  const [state, setState] = useSetState({
    week_dates: [],
    visits: [],
    today_index: 0,
    loading: true
  });

  useEffect(() => {
    const today = new Date();
    setState({week_dates: getWeekDates(today)});
  }, [props.week_number]);

  function getWeekDates(today) {
    const today_in_that_week = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7 * props.week_number);

    let week = [];
    for (let i = 1; i <= 7; i++) {
      const new_date = today_in_that_week.getDate() - today_in_that_week.getDay() + i;
      const new_day = new Date(today_in_that_week.setDate(new_date));
      week.push(
        `${('0' + new_day.getDate()).slice(-2)}.${('0' + (new_day.getMonth() + 1)).slice(-2)}.${new_day.getFullYear().toString().slice(-2)}`
      );
    }
    return week;
  }

  useEffect(() => {
    if (state.week_dates.length) {
      getVisits();
      getTodayInThisWeekIndex();
    }
  }, [state.week_dates]);

  function getVisits() {
    let formData = new FormData();
    formData.append('first_day', state.week_dates[0]);
    axiosPostRequest(`get_visits`, formData)
      .then((response) => {
        setState({
          visits: response,
          loading: false
        });
      })
      .catch((error) => notify(error));
  }

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
    let visits = [];
    if (state.visits.length > 0 && time) {
      visits = state.visits.filter((visit) => visit.start === time);
    }
    return visits;
  }

  return (
    <Choose>
      <When condition={!state.loading}>
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
            <Row week_number={props.week_number} visits={getVisitsByTime('08:00')} week={state.week_dates} time='8:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('09:00')} week={state.week_dates} time='9:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('10:00')} week={state.week_dates} time='10:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('11:00')} week={state.week_dates} time='11:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('12:00')} week={state.week_dates} time='12:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('13:00')} week={state.week_dates} time='13:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('14:00')} week={state.week_dates} time='14:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('15:00')} week={state.week_dates} time='15:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('16:00')} week={state.week_dates} time='16:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('17:00')} week={state.week_dates} time='17:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('18:00')} week={state.week_dates} time='18:00' />
          </tbody>
        </table>
      </When>
      <Otherwise>
        <Loader />
      </Otherwise>
    </Choose>
  );
}

Week.defaultProps = {
  week_number: 0
};

export default view(Week);
