import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import './schedule.css';
import Row from 'home/templates/home/schedule/row';

function Week(props) {
  const [state, setState] = useSetState({
    week: [],
    today_index: 0,
  });

  useEffect(() => {
    switch (props.week_number) {
      case 1:
        setState({week: schedulerState.first_week_dates})
        break;
      case 2:
        setState({week: schedulerState.second_week_dates})
        break;
      case 3:
        setState({week: schedulerState.third_week_dates})
        break;
    }
  }, [props.week_number]);

  useEffect(() => {
    getTodayInThisWeekIndex();
  }, [props.week]);

  function getTodayInThisWeekIndex() {
    // TODO оновлення дати в 00:00 (якщо програму наприклад не закрили)
    const {week} = props;

    let today_index = 0;
    for (let i = 0; i < week.length; i++) {
      if (week[i] === schedulerState.today_string) {
        today_index = i + 1;
      }
    }
    setState({today_index});
  }

  return (
    <If condition={state.week.length}>
      {/*TODO Переробити на Suspence*/}
      <table className='table table-sm scheduler'>
        <thead>
          <tr>
            <th scope='col' className='scheduler_th'></th>
            <th scope='col' className={`${state.today_index === 1 ? 'today' : ''} scheduler_th`}>
              Пн, {state.week[0]}
            </th>
            <th scope='col' className={`${state.today_index === 2 ? 'today' : ''} scheduler_th`}>
              Вт, {state.week[1]}
            </th>
            <th scope='col' className={`${state.today_index === 3 ? 'today' : ''} scheduler_th`}>
              Ср, {state.week[2]}
            </th>
            <th scope='col' className={`${state.today_index === 4 ? 'today' : ''} scheduler_th`}>
              Чт, {state.week[3]}
            </th>
            <th scope='col' className={`${state.today_index === 5 ? 'today' : ''} scheduler_th`}>
              Пт, {state.week[4]}
            </th>
            <th scope='col' className={`${state.today_index === 6 ? 'today' : ''} scheduler_th`}>
              Сб, {state.week[5]}
            </th>
            <th scope='col' className={`${state.today_index === 7 ? 'today' : ''} scheduler_th`}>
              Нд, {state.week[6]}
            </th>
          </tr>
        </thead>
        <tbody>
          <Row week={state.week} time='8:00' />
          <Row week={state.week} time='9:00' />
          <Row week={state.week} time='10:00' />
          <Row week={state.week} time='11:00' />
          <Row week={state.week} time='12:00' />
          <Row week={state.week} time='13:00' />
          <Row week={state.week} time='14:00' />
          <Row week={state.week} time='15:00' />
          <Row week={state.week} time='16:00' />
          <Row week={state.week} time='17:00' />
          <Row week={state.week} time='18:00' />
        </tbody>
      </table>
    </If>
  );
}

Week.defaultProps = {
  week_number: 0
};

export default view(Week);
