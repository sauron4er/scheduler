import React from 'react';
import {store, view} from '@risingstack/react-easy-state';
import useSetState from 'templates/hooks/useSetState';
import PaginatedTable from 'templates/components/tables/paginated_table';
import NewClient from 'home/templates/home/clients/new_client';
import EditClient from 'home/templates/home/clients/edit_client';
import clientsState from 'home/templates/home/clients/state';

function Clients() {
  const [state, setState] = useSetState({
    client: {}
  });

  function onRowClick(client) {
    clientsState.editing_opened = true;
    clientsState.refresh = false;
    setState({client});
  }

  return (
    <>
      <NewClient />
      <PaginatedTable
        url='get_clients'
        onRowClick={onRowClick}
        colWidth={colWidth}
        refresh={clientsState.refresh}
        lookForName={clientsState.new_client_name}
      />
      <EditClient client={state.client} />
    </>
  );
}

const colWidth = [
  {label: 'name', width: '25%'},
  {label: 'phone', width: '150px'},
  {label: 'address', width: '10%'}
];

export default view(Clients);
