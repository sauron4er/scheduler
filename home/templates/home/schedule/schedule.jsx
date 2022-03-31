import * as React from 'react';
import MyScheduler from 'templates/components/scheduler/my_scheduler';

class Schedule extends React.PureComponent {
  state = {
    first_week: [],
    second_week: [],
    third_week: [],
  };

  componentDidMount() {
    const today = new Date();
    const first_week = this.getWeek(today)
    const second_week = this.getWeek(today)
    const third_week = this.getWeek(today)
    this.setState({first_week, second_week, third_week})
  }

  getWeek = (day) => {
    const week = []
    for (let i = 1; i <= 7; i++) {
      const new_date = day.getDate() - day.getDay() + i
      const new_day = new Date(day.setDate(new_date));
      week.push(`${("0" + new_day.getDate()).slice(-2)}.${("0" + (new_day.getMonth() + 1)).slice(-2)}`)
    }
    return week
  };

  render() {
    const {first_week, second_week, third_week} = this.state;
    return (
      <>
        <div className='d-flex'>
          <div className='font-weight-bold mb-2'>Навігація (приклеїти до верхньої межі екрану)</div>
          <div className='font-weight-bold ml-auto'>View switcher</div>
        </div>
        <MyScheduler week={first_week} />
        <MyScheduler week={second_week} />
        <MyScheduler week={third_week} />
      </>
    );
  }
}

export default Schedule;
