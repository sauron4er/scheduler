import { store, view } from '@risingstack/react-easy-state';

const schedulerState = store({
  schedule: [],
  today_string: '',
  first_week: [],
  second_week: [],
  third_week: [],
  clicked_day: null,
  clicked_time: null
});

export default schedulerState;