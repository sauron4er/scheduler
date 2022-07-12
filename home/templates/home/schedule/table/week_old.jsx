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
  //
  // function getWeekDates() {
  //   const today = new Date();
  //   const today_in_this_week = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7 * props.week_number);
  //   let week = [];
  //
  //   for (let i = 1; i <= 7; i++) {
  //     const todays_day_number = today_in_this_week.getDay() === 0 ? 7 : today_in_this_week.getDay();
  //     const new_date = today_in_this_week.getDate() - todays_day_number + i;
  //
  //     const new_day = new Date(today_in_this_week.setDate(new_date));
  //     week.push(
  //       `${('0' + new_day.getDate()).slice(-2)}.${('0' + (new_day.getMonth() + 1)).slice(-2)}.${new_day.getFullYear().toString().slice(-2)}`
  //     );
  //   }
  //   return week;
  // }

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

  // useEffect(() => {
  //   if (state.week_dates.length) {
  //     // getWeek();
  //     getIndexOfToday();
  //   }
  // }, [state.week_dates]);

  function getWeek() {
    let formData = new FormData();
    formData.append('first_day', getFirstDayDate());
    // formData.append('first_day', state.week_dates[0]);
    axiosPostRequest(`get_week`, formData)
      .then((response) => {
        console.log(response);
        setState({
          visits: response.visits,
          week_dates: response.week_dates,
          loading: false
        });
      })
      .catch((error) => notify(error));
  }

  // function getIndexOfToday() {
  //   // TODO оновлення дати в 00:00 (якщо програму наприклад не закрили)
  //   const {week_dates} = state;
  //
  //   let today_index = 0;
  //   for (let i = 0; i < week_dates.length; i++) {
  //     if (week_dates[i] === schedulerState.today_string) {
  //       today_index = i + 1;
  //     }
  //   }
  //   setState({today_index});
  // }

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

  function disableDay(week_number, day_number) {
    console.log(week_number);
    console.log(day_number);
    console.log(state.week_dates);
  }

  return (
    <Choose>
      <When condition={!state.loading}>
        <table id={`week_${props.week_number}`} className='table table-sm scheduler'>
          <thead>
            <tr>
              <th scope='col' className='scheduler_th'></th>
              {/* time */}
              <th scope='col' className={`${state.today_index === 1 ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Пн, {state.week_dates[0]}</div>
                  <label className='css_switch' htmlFor='checkbox' onClick={(e) => disableDay(props.week_number, 0)}>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_0`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.today_index === 2 ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Вт, {state.week_dates[1]}</div>
                  <label className='css_switch' htmlFor='checkbox'>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_1`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.today_index === 3 ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Ср, {state.week_dates[2]}</div>
                  <label className='css_switch' htmlFor='checkbox'>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_2`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.today_index === 4 ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Чт, {state.week_dates[3]}</div>
                  <label className='css_switch' htmlFor='checkbox'>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_3`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.today_index === 5 ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Пт, {state.week_dates[4]}</div>
                  <label className='css_switch' htmlFor='checkbox'>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_4`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.today_index === 6 ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Сб, {state.week_dates[5]}</div>
                  <label className='css_switch' htmlFor='checkbox'>
                    <input type='checkbox' id={`chkbx_week_${props.week_number}_5`} />
                    <div className='css_slider css_round' />
                  </label>
                </div>
              </th>
              <th scope='col' className={`${state.today_index === 7 ? 'th_today' : ''} scheduler_th`}>
                <div className='css_header_cell'>
                  <div className='css_header_date'>Нд, {state.week_dates[6]}</div>
                  <label className='css_switch' htmlFor='checkbox'>
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
