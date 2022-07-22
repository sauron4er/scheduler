import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {view} from '@risingstack/react-easy-state';
import schedulerState from '../state';
import Week from './table/week';
import VisitPopup from "./popups/visit_popup";
import {ToastContainer} from 'react-toastify';

//TODO Не is_staff спеціаліст
// 1. Не може додавати нових спеціалістів
// 2. Може редагувати лише себе в спеціалістах
// 3. Записи, створені ним, автоматично записують собі цього спеціаліста
// 4. Може видаляти лише свої візити
// 5. Може додавати клієнтів, але не може їх видаляти

//TODO Теми:
// 1. Таблиця в bd - Themes. Поля: id, name
// 2. В таблиці employee нове поле theme - посилання на ід теми. Default: 1
// 3. Тема 1 - біла, 2 - жовта, 3 - чорна
// 4. При зміні теми в профілі записувати зміни в базу.



//TODO можливість змінити дату і час візиту прямо на вкладці. Після цього автоматично оновити week або обидва.
//TODO можливість редагувати поля інфи клієнта прямо у client_popup
//TODO можливість видаляти майбутні прийоми прямо у client_popup
//TODO drag&drop, в т.ч. і між тижнями
//TODO візити на півгодини або більше ніж на годину
//TODO зробити варіант "вихідний" тільки для одного лікаря. В такі дні він зникає зі списку на призначення
//TODO оновлення дати в 00:00 (якщо програму наприклад не закрили)


//TODO Мобільна версія для андроіда і іОс, але браузер теж має працювати на маленьких екранах
//TODO у мобільній верісї показувати один день на екран, але свайпити дні направо-наліво (може свайпити тижні вверх-вниз?)


//TODO Підписка на події у базі даних
//TODO Робота без інтернета: показувати лише збережену востаннє базу, не давати зберігати нові дані.
//     Bootstrap скачати, зберігати дані у local session?
//TODO перевести тригер оновлення візитів у web worker

setInterval(() => {schedulerState.updateVisits = !schedulerState.updateVisits}, 300000)

function Schedule() {
  const [state, setState] = useSetState({});

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
      <VisitPopup />
      <div className='schedule_plus_button'>
        <button className='btn btn-sm btn-outline-dark bg-white mb-3' onClick={(e) => addWeek()}>
          +
        </button>
      </div>
      <ToastContainer />
    </>
  );
}

export default view(Schedule);
