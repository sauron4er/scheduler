import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {view} from '@risingstack/react-easy-state';
import schedulerState from './state';
import VisitModal from './visit_modal';
import Week from "./week";

//TODO В модальному вікні візита зробити біля імені клієнта кнопку "знак питання",
// вона відкриває нове модальне вікно, в якому показано історію клієнта.
//TODO вічна прокрутка тижнів? При прокручування до кінця підгружається новий компонент week
//TODO Підписка на події у базі даних
//TODO Зробити так, щоб зміни, внесені на одному компі, відразу відображалися і на другому
//TODO Робота без інтернета: показувати лише збережену востаннє базу, не давати зберігати нові дані.
//     Bootstrap скачати, зберігати дані у local session?
//TODO Мобільна версія для гугл-плея і іОс, але браузер теж має працювати на маленьких екранах
//TODO Визначати вихідні однією галочкою
//TODO Заборона записувати клієнтів заднім числом, максимум в межах дня
//TODO notify для помилок


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

  return (
    <>
      <div className='d-flex'>
        <div className='font-weight-bold mb-2'>Навігація (приклеїти до верхньої межі екрану)</div>
        <div className='font-weight-bold ml-auto'>View switcher</div>
      </div>

      <Week week_number={0} />
      <Week week_number={1} />
      <Week week_number={2} />
      {/*<NewVisit />*/}
      <VisitModal />
    </>
  );
}

export default view(Schedule);
