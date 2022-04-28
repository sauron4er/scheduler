import React from 'react';
import {store, view} from '@risingstack/react-easy-state';
import useSetState from 'templates/hooks/useSetState';
import PaginatedTable from 'templates/components/tables/paginated_table';
import NewEmployee from 'home/templates/home/employees/new_employee';
import EditEmployee from 'home/templates/home/employees/edit_employee';
import employeesState from 'home/templates/home/employees/state';

function Employees() {
  const [state, setState] = useSetState({
    employee: {}
  });

  function onRowClick(employee) {
    employeesState.editing_opened = true;
    employeesState.refresh = false;
    setState({employee});
  }

  return (
    <>
      <NewEmployee />
      <PaginatedTable
        url='get_employees'
        onRowClick={onRowClick}
        colWidth={colWidth}
        refresh={employeesState.refresh}
        lookForName={employeesState.new_employee_name}
      />
      <EditEmployee employee={state.employee} />
    </>
  );
}

const colWidth = [
  {label: 'name', width: '25%'},
  {label: 'phone', width: '150px'},
  {label: 'address', width: '15%'},
  {label: 'color', width: '10%'},
];

export default view(Employees);
