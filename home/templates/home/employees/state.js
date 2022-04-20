import { store, view } from '@risingstack/react-easy-state';

const employeesState = store({
  refresh: false,
  editing_opened: false,
  new_employee_name: ''
});

export default employeesState;