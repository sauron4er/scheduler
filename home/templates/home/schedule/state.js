import { store, view } from '@risingstack/react-easy-state';

const schedulerState = store({
  updateVisits: false,
  number_of_weeks: 2,
  today_string: '',
  clicked_week: null,
  clicked_day: null,
  clicked_time: null,
  clicked_client: null,
  clicked_visit: {
    id: 0,
    client: 0,
    client_name: '',
    employee: 0,
    employee_name: '',
    employee_color: '',
    note: ''
  },
  hovered_visits_week: -1,
  hovered_visit: '',
  hovered_visit_position: {},
  hover: 0
});

export default schedulerState;