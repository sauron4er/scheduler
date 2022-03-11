import * as React from 'react';
import PaginatedTable from "templates/components/tables/paginated_table";
import TextInput from "templates/components/form_modules/text_input";
import SubmitButton from "templates/components/form_modules/submit_button";
import {axiosPostRequest} from "templates/components/axios_requests";


class Clients extends React.PureComponent {
  state = {
    client_name: '',
    phone: '',
    address: '',
    new_client_name: '',
    new_client_phone: '',
    new_client_address: '',
    new_client_note: ''
  };

  onNewClientChange = (e, type) => {
    this.setState({[type]: e.target.value})  ;
  };

  postNewClient = () => {
    let formData = new FormData();
    formData.append('name', this.state.new_client_name);
    formData.append('phone', this.state.new_client_phone);
    formData.append('address', this.state.new_client_address);
    formData.append('note', this.state.new_client_note);

    axiosPostRequest('post_new_client', formData)
      .then((response) => {
        location.reload();
      })
      .catch((error) => notify(error));
  };

  render() {
    const {new_client_name, new_client_phone, new_client_address, new_client_note, client_name} = this.state;
    return (
      <div className='d-flex'>
        <div className='col-3'>
          <h5>Новий клієнт</h5>
          <TextInput
            text={new_client_name}
            fieldName='Ім’я'
            onChange={e => this.onNewClientChange(e, 'new_client_name')}
            maxLength={100}
          />
          <hr/>
          <TextInput
            text={new_client_phone}
            fieldName='Номер телефону'
            onChange={e => this.onNewClientChange(e, 'new_client_phone')}
            maxLength={10}
          />
          <hr/>
          <TextInput
            text={new_client_address}
            fieldName='Адреса'
            onChange={e => this.onNewClientChange(e, 'new_client_address')}
            maxLength={100}
          />
          <hr/>
          <TextInput
            text={new_client_note}
            fieldName='Нотатка'
            onChange={e => this.onNewClientChange(e, 'new_client_note')}
            maxLength={1000}
          />
          <SubmitButton
            text='Зберегти'
            onClick={this.postNewClient}
            disabled={!new_client_name}
          />
        </div>
        <div className='col-6'>
          <PaginatedTable
            url={`get_clients`}
            columns={columns}
            defaultSorting={[{columnName: 'name', direction: 'desc'}]}
            colWidth={col_width}
            onRowClick={this.onRowClick}
            height='800px'
            filter
            attentionColumn={true}
          />
        </div>
        <div className='col-3'>
          <If condition={client_name}>
            <h5>{client_name}</h5>
          </If>
        </div>
      </div>
    );
  }
}

export default Clients;


const columns = [
  {name: 'name', title: 'Ім’я'},
  {name: 'phone', title: 'Телефон'},
  {name: 'address', title: 'Адреса'}
];

const col_width = [
  // {columnName: 'id', width: 40},
];
