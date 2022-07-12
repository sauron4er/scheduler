import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/state';
import 'static/css/schedule.css';
import 'static/css/slider.css';
import Row from 'home/templates/home/schedule/table/row';
import {axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/react_toastify_settings';
import {Loader} from 'templates/components/form_modules/loaders';
import VisitModal from 'home/templates/home/schedule/visit_modal';
import {getIndex} from 'templates/my_extras';

function Week(props) {
  const [state, setState] = useSetState({
    week_dates: [],
    visits: [],
    today_index: 0,
    loading: true
  });

  useEffect(() => {
    if (schedulerState.updateVisits) {
      getWeek();
    }
  }, [schedulerState.updateVisits]);

  useEffect(() => {
    getWeek()
  }, [props.week_number]);

  function getFirstDayDate() {
    // Знаходимо дату понеділка, щоб відправити на сервер запит про тиждень
    const today = new Date();
    const today_in_this_week = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7 * props.week_number);

    const todays_day_number = today_in_this_week.getDay() === 0 ? 7 : today_in_this_week.getDay();
    const new_date = today_in_this_week.getDate() - todays_day_number + 1;
    const new_day = new Date(today_in_this_week.setDate(new_date));
    return `${('0' + new_day.getDate()).slice(-2)}.${('0' + (new_day.getMonth() + 1)).slice(-2)}.${new_day
      .getFullYear()
      .toString()
      .slice(-2)}`;
  }

  function getWeek() {
    let formData = new FormData();
    formData.append('first_day', getFirstDayDate());
    axiosPostRequest(`get_week`, formData)
      .then((response) => {
        setState({
          visits: response.visits,
          week_dates: response.week_dates,
          loading: false
        });
      })
      .catch((error) => notify(error));
  }

  function getVisitsByTime(time) {
    let visits = [];
    if (state.visits.length > 0 && time) {
      visits = state.visits.filter((visit) => visit.start === time);
    }
    return visits;
  }

  function addVisitToList(visit) {
    let visits_new = [...state.visits];
    visits_new.push(visit);
    setState({visits: [...visits_new]});
  }

  function changeVisitInList(visit) {
    const index = getIndex(visit.id, state.visits);
    let visits_new = [...state.visits];
    visits_new[index] = {...visit};
    setState({visits: [...visits_new]});
  }

  function removeVisit(id) {
    const index = getIndex(id, state.visits);
    let visits_new = [...state.visits];
    visits_new.splice(index, 1);
    setState({visits: [...visits_new]});
  }

  function disableDay(date) {
    //TODO призначити день вихідним
    //TODO зробити cells неактивними якщо день вихідний
    console.log(date);
  }

  return (
    <Choose>
      <When condition={!state.loading}>
        <table id={`week_${props.week_number}`} className='table table-sm scheduler'>
          <thead>
            <tr>
              <th scope='col' className='scheduler_th'></th>
              <th scope='col' className={`${state.week_dates[0].is_today ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Пн, {state.week_dates[0].date}</div>
                  <label className='css_switch' htmlFor='checkbox' onClick={(e) => disableDay(state.week_dates[0].date)}>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_0`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.week_dates[1].is_today ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Вт, {state.week_dates[1].date}</div>
                  <label className='css_switch' htmlFor='checkbox' onClick={(e) => disableDay(state.week_dates[1].date)}>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_1`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.week_dates[2].is_today ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Ср, {state.week_dates[2].date}</div>
                  <label className='css_switch' htmlFor='checkbox' onClick={(e) => disableDay(state.week_dates[2].date)}>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_2`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.week_dates[3].is_today ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Чт, {state.week_dates[3].date}</div>
                  <label className='css_switch' htmlFor='checkbox' onClick={(e) => disableDay(state.week_dates[3].date)}>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_3`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.week_dates[4].is_today ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Пт, {state.week_dates[4].date}</div>
                  <label className='css_switch' htmlFor='checkbox' onClick={(e) => disableDay(state.week_dates[4].date)}>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_4`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.week_dates[5].is_today ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Сб, {state.week_dates[5].date}</div>
                  <label className='css_switch' htmlFor='checkbox' onClick={(e) => disableDay(state.week_dates[5].date)}>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_5`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.week_dates[6].is_today ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Нд, {state.week_dates[6].date}</div>
                  <label className='css_switch' htmlFor='checkbox' onClick={(e) => disableDay(state.week_dates[6].date)}>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_6`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <Row week_number={props.week_number} visits={getVisitsByTime('08:00')} week={state.week_dates} time='08:00' />
            <Row week_number={props.week_number} visits={getVisitsByTime('09:00')} week={state.week_dates} time='09:00' />
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
        <VisitModal
          opened={schedulerState.clicked_week === props.week_number}
          addVisit={addVisitToList}
          changeVisit={changeVisitInList}
          removeVisit={removeVisit}
        />
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
