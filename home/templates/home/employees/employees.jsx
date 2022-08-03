import React, { useEffect } from "react";
import {store, view} from '@risingstack/react-easy-state';
import useSetState from 'templates/hooks/useSetState';
import PaginatedTable from 'templates/components/tables/paginated_table';
import NewEmployee from 'home/templates/home/employees/new_employee';
import EditEmployee from 'home/templates/home/employees/edit_employee';
import employeesState from 'home/templates/home/employees/state';
import Modal from "templates/components/modal/modal";

function Employees() {
  const [state, setState] = useSetState({
    employee: null,
    edit_modal_opened: false
  });

  function onRowClick(employee) {
    setState({employee})
    employeesState.refresh = false;
  }

  useEffect(() => {
    if (state.employee) setState({edit_modal_opened: true})
  }, [state.employee])

  function closeModal() {
    setState({edit_modal_opened: false})
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
      <Modal open={state.edit_modal_opened} onClose={closeModal}>
        <EditEmployee employee={state.employee} closeModal={closeModal} is_staff />
      </Modal>
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
