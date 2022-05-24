import { store, view } from '@risingstack/react-easy-state';

const schedulerState = store({
  schedule: [],
  today_string: '',
  visits: [],
  first_week_dates: [],
  second_week_dates: [],
  third_week_dates: [],
  clicked_day: null,
  clicked_time: null,
  add_to_schedule: (new_visit) => {}
});

export default schedulerState;