import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import schedulerState from 'home/templates/home/schedule/state';
import Week from 'home/templates/home/schedule/week';
import NewVisit from 'home/templates/home/schedule/new_visit';

//TODO Підписка на події у базі даних
//TODO Зробити так, щоб зміни, внесені на одному компі, відразу відображалися і на другому


function Schedule() {
  const [state, setState] = useSetState({
    first_week: [],
    second_week: [],
    third_week: [],
    client: 0,
    client_name: ''
  });

  useEffect(() => {
    const today = new Date();
    schedulerState.today_string = `${('0' + today.getDate()).slice(-2)}.${('0' + (today.getMonth() + 1)).slice(-2)}`;
    const first_week = getWeek(today);
    const second_week = getWeek(today);
    const third_week = getWeek(today);
    setState({first_week, second_week, third_week});
  }, []);

  function getWeek(day) {
    let week = [];
    for (let i = 1; i <= 7; i++) {
      const new_date = day.getDate() - day.getDay() + i;
      const new_day = new Date(day.setDate(new_date));
      week.push(`${('0' + new_day.getDate()).slice(-2)}.${('0' + (new_day.getMonth() + 1)).slice(-2)}`);
    }
    return week;
  }

  return (
    <>
      <div className='d-flex'>
        <div className='font-weight-bold mb-2'>Навігація (приклеїти до верхньої межі екрану)</div>
        <div className='font-weight-bold ml-auto'>View switcher</div>
      </div>
      <Week week={state.first_week} />
      <Week week={state.second_week} />
      <Week week={state.third_week} />
      <NewVisit />
    </>
  );
}

export default view(Schedule);
