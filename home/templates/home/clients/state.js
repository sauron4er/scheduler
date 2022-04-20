import { store, view } from '@risingstack/react-easy-state';

const clientsState = store({
  refresh: false,
  editing_opened: false,
  new_client_name: ''
});

export default clientsState;