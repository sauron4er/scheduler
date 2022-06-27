import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {view} from '@risingstack/react-easy-state';
import schedulerState from './state';
import VisitModal from './visit_modal';
import Week from './week';
import WeekExperimental from 'home/templates/home/schedule/week_experimental';


//TODO оновлювати таблицю або візит при редагуванні
//TODO В модальному вікні візита показувати номер телефона клієнта і кнопку для відкриття його модалки,
// в якій його історія і нотатки.
//TODO Визначати вихідні однією галочкою

//TODO Мобільна версія для андроіда і іОс, але браузер теж має працювати на маленьких екранах

//TODO переробити таблицю з візитами на 7 окремих таблиць для кожного дня окремо? Чи лиш для телефона?

//TODO drag&drop
//TODO Підписка на події у базі даних
//TODO Робота без інтернета: показувати лише збережену востаннє базу, не давати зберігати нові дані.
//     Bootstrap скачати, зберігати дані у local session?


function Schedule() {
  const [state, setState] = useSetState({
    loading: true
  });

  useEffect(() => {
    const today = new Date();
    schedulerState.today_string = `${('0' + today.getDate()).slice(-2)}.${('0' + (today.getMonth() + 1)).slice(-2)}.${today
      .getFullYear()
      .toString()
      .slice(-2)}`;

    schedulerState.first_day_of_first_week = getFirstDateOfFirstWeek(today);
  }, []);

  function getFirstDateOfFirstWeek(day) {
    const new_date = day.getDate() - day.getDay() + 1;
    const new_day = new Date(day.setDate(new_date));
    return `${('0' + new_day.getDate()).slice(-2)}.${('0' + (new_day.getMonth() + 1)).slice(-2)}.${new_day
      .getFullYear()
      .toString()
      .slice(-2)}`;
  }

  function getWeeks() {
    let weeks = [];
    for (let i = 0; i < schedulerState.number_of_weeks; i++) {
      weeks.push(<Week key={i} week_number={i} />);
    }
    return weeks;
  }

  function addWeek() {
    schedulerState.number_of_weeks++;
  }

  return (
    <>
      <WeekExperimental />

      {getWeeks()}

      <div className='text-center'>
        <button className='btn btn-outline-dark mb-3' onClick={(e) => addWeek()}>
          +
        </button>
      </div>

      {/*<NewVisit />*/}
      <VisitModal />

      <div className='css_visit_popup' id='popup' style={{display: 'none'}}>
        {schedulerState.hovered_visits_client_name}
        <If condition={schedulerState.hovered_visits_client_phone}>
          <div>
            <small>{schedulerState.hovered_visits_client_phone}</small>
          </div>
        </If>
        <If condition={schedulerState.hovered_visits_note}>
          <div>
            <small>{schedulerState.hovered_visits_note}</small>
          </div>
        </If>
      </div>
    </>
  );
}

export default view(Schedule);
