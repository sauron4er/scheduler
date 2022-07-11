import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import 'static/css/schedule.css';
import TimeColExperimental from 'home/templates/home/schedule/mobile/time_col_experimental';
import DayExperimental from 'home/templates/home/schedule/mobile/day_experimental';

function WeekExperimental(props) {
  const [state, setState] = useSetState({
    week_dates: []
  });

  useEffect(() => {
    setState({week_dates: getWeekDates()});
  }, [props.week_number]);

  function getWeekDates() {
    const today = new Date();
    const today_in_this_week = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7 * props.week_number);
    let week = [];

    for (let i = 1; i <= 7; i++) {
      const todays_day_number = today_in_this_week.getDay() === 0 ? 7 : today_in_this_week.getDay();
      const new_date = today_in_this_week.getDate() - todays_day_number + i;

      const new_day = new Date(today_in_this_week.setDate(new_date));
      const day_name = getDayName(i);
      week.push(
        `${day_name} ${('0' + new_day.getDate()).slice(-2)}.${('0' + (new_day.getMonth() + 1)).slice(-2)}.${new_day
          .getFullYear()
          .toString()
          .slice(-2)}`
      );
    }
    return week;
  }

  function getDayName(i) {
    switch (i) {
      case 1:
        return 'Пн.';
      case 2:
        return 'Вт.';
      case 3:
        return 'Ср.';
      case 4:
        return 'Чт.';
      case 5:
        return 'Пт.';
      case 6:
        return 'Сб.';
      case 7:
        return 'Нд.';
    }
  }

  return (
    <>
      <TimeColExperimental />
      <div className='css_week_table'>
      <For each='day' of={state.week_dates} index='idx'>
        <DayExperimental key={day} date={day} />
      </For>
      </div>
    </>
  );
}

WeekExperimental.defaultProps = {
  week_number: 0
};

export default view(WeekExperimental);
