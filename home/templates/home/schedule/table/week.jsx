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
import Header from 'home/templates/home/schedule/table/header';

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
    getWeek();
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

  function toggleHoliday(date, is_holiday) {
    let week_dates = [...state.week_dates];
    for (const i in week_dates) {
      if (week_dates[i].date === date) {
        week_dates[i].is_holiday = is_holiday;
        break;
      }
    }
    setState({week_dates: [...week_dates]});
  }

  return (
    <Choose>
      <When condition={!state.loading}>
        <div className='scheduler_overflow_line'>
          <table id={`week_${props.week_number}`} className='table table-sm scheduler'>
            <thead>
              <Header week_number={props.week_number} week_dates={state.week_dates} toggleHoliday={toggleHoliday} />
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
        </div>
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
