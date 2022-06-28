import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {view} from '@risingstack/react-easy-state';
import schedulerState from './state';
import Week from './week';

//TODO інфа про клієнта при перегляді візиту: телефон, нотатка, майбутні прийоми, історія попередніх прийомів.
//TODO можливість видаляти майбутні прийоми прямо звідси

//TODO Визначати вихідні однією галочкою

//TODO Мобільна версія для андроіда і іОс, але браузер теж має працювати на маленьких екранах

//TODO у мобільній верісї показувати один день на екран, але свайпити дні направо-наліво (може свайпити тижні вверх-вниз?)

//TODO drag&drop, в т.ч. і між тижнями
//TODO візити на півгодини або більше ніж на годину
//TODO Підписка на події у базі даних
//TODO Робота без інтернета: показувати лише збережену востаннє базу, не давати зберігати нові дані.
//     Bootstrap скачати, зберігати дані у local session?
//TODO перевести тригер оновлення візитів у web worker

setInterval(() => {schedulerState.updateVisits = !schedulerState.updateVisits}, 300000)

function Schedule() {
  const [state, setState] = useSetState({});

  // setInterval(() => {schedulerState.updateVisits = true}, 600000)


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
      {getWeeks()}

      <div className='text-center'>
        <button className='btn btn-outline-dark mb-3' onClick={(e) => addWeek()}>
          +
        </button>
      </div>

      <div className='css_visit_popup' id='popup' style={{display: 'none'}}>
        {schedulerState.hovered_visits_client_name}
        <If condition={schedulerState.hovered_visits_client_phone}>
          <div>
            <small>{schedulerState.hovered_visits_client_phone}</small>
          </div>
        </If>
        <If condition={schedulerState.hovered_visits_note}>
          <div>
            <small className='font-italic'>{schedulerState.hovered_visits_note}</small>
          </div>
        </If>
      </div>
    </>
  );
}

export default view(Schedule);
