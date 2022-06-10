import { store, view } from '@risingstack/react-easy-state';
import {getIndex} from "templates/my_extras";

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
  clicked_visit: {
    id: 0,
    client: 0,
    client_name: '',
    employee: 0,
    employee_name: '',
    employee_color: '',
    note: ''
  },
  add_visit: (new_visit) => {
    switch (schedulerState.clicked_week) {
      case 1:
        schedulerState.visits.first_week.push(new_visit)
        break;
      case 2:
        schedulerState.visits.second_week.push(new_visit)
        break;
      case 3:
        schedulerState.visits.third_week.push(new_visit)
        break;
    }
  },
  change_visit: (visit) => {
    let visit_index = -1;
    let visits = [];
    switch (schedulerState.clicked_week) {
      case 1:
        visit_index = getIndex(visit.id, schedulerState.visits.first_week)
        visits = JSON.parse(JSON.stringify(schedulerState.visits.first_week));
        // let assign=Object.assign(visits, schedulerState.visits.first_week)
        visits[visit_index] = { ...visit }
        schedulerState.visits.first_week = JSON.parse(JSON.stringify(visits));
        // let assign2=Object.assign(schedulerState.visits.first_week, visits)
        break;
      case 2:
        visit_index = getIndex(visit.id, schedulerState.visits.second_week)
        visits = [...schedulerState.visits.second_week]
        visits[visit_index] = visit
        schedulerState.visits.first_week = [...visits]
        break;
      case 3:
        visit_index = getIndex(visit.id, schedulerState.visits.third_week)
        visits = [...schedulerState.visits.third_week]
        visits[visit_index] = visit
        schedulerState.visits.first_week = [...visits]
        break;
    }
  }
});

export default schedulerState;