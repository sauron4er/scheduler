import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import Week from 'home/templates/home/schedule/week';
import NewVisit from 'home/templates/home/schedule/new_visit';
import {axiosGetRequest} from "../../../../templates/components/axios_requests";
import {notify} from "../../../../templates/components/form_modules/modules_config";

//TODO Показувати у селекті колір доктора
//TODO Виправити запис "added" у базу даних
//TODO Підписка на події у базі даних
//TODO Зробити так, щоб зміни, внесені на одному компі, відразу відображалися і на другому
//TODO Робота без інтернета: показувати лише збережену востаннэ базу, не давати зберігати нові дані.
//     Bootstrap скачати, зберігати дані у local session?
//TODO Мобільна версія для гугл-плея і іос, але браузер теж має працювати на маленьких екранах
//TODO Визначати вихідні однією галочкою
//TODO Заборона записувати клієнтів заднім числом, максимум в межах дня
//TODO notify для помилок


function Schedule() {
  const [state, setState] = useSetState({
    first_week: [],
    second_week: [],
    third_week: [],
    first_day_of_first_week: '',
    client: 0,
    client_name: ''
  });

  useEffect(() => {
    const today = new Date();
    schedulerState.today_string = `${
      ('0' + today.getDate()).slice(-2)}.${
      ('0' + (today.getMonth() + 1)).slice(-2)}.${
      (today.getFullYear().toString().slice(-2))}`;

    const first_week = getWeek(today);
    const first_day_of_first_week = first_week[0]
    const second_week = getWeek(today);
    const third_week = getWeek(today);
    getInitialVisits(first_day_of_first_week)
    setState({first_week, second_week, third_week, first_day_of_first_week});
    schedulerState.first_week_dates = first_week
    schedulerState.second_week_dates = second_week
    schedulerState.third_week_dates = third_week
  }, []);

  function getInitialVisits(first_day_of_first_week) {
    axiosGetRequest(`get_visits/${first_day_of_first_week}/`)
      .then((response) => {
        setState({visits: response});
        schedulerState.visits = response
        console.log(response);
      })
      .catch((error) => notify(error));
  }

  function getWeek(day) {
    let week = [];
    for (let i = 1; i <= 7; i++) {
      const new_date = day.getDate() - day.getDay() + i;
      const new_day = new Date(day.setDate(new_date));
      week.push(`${('0' + new_day.getDate()).slice(-2)}.${
        ('0' +(new_day.getMonth() + 1)).slice(-2)}.${
        (new_day.getFullYear().toString().slice(-2))}`);
    }
    return week;
  }

  return (
    <>
      <div className='d-flex'>
        <div className='font-weight-bold mb-2'>Навігація (приклеїти до верхньої межі екрану)</div>
        <div className='font-weight-bold ml-auto'>View switcher</div>
      </div>
      {/*<Week week={state.first_week} />*/}
      <Week week_number={1}/>
      {/*TODO Переробити Week, щоб він отримував лише цифру з порядковим номером тижня, а все інше брав з schedulerState*/}
      <Week week={state.second_week} visits={state.second_week_visits} />
      <Week week={state.third_week} visits={state.third_week_visits} />
      <NewVisit />
    </>
  );
}

export default view(Schedule);
