import { store, view } from '@risingstack/react-easy-state';

const schedulerState = store({
  schedule: [],
  today_string: '',
  visits: [],
  first_week_dates: [],
  second_week_dates: [],
  third_week_dates: [],
  clicked_week: null,
  clicked_day: null,
  clicked_time: null,
  add_to_schedule: (new_visit) => {
    switch (schedulerState.clicked_week) {
      case 1:
        schedulerState.visits.first_week.push(new_visit)
        console.log(schedulerState.visits.first_week);
        break;
      case 2:
        schedulerState.visits.second_week.push(new_visit)
        console.log(schedulerState.visits.second_week);
        break;
      case 3:
        schedulerState.visits.third_week.push(new_visit)
        console.log(schedulerState.visits.third_week);
        break;
    }
  }
});

export default schedulerState;