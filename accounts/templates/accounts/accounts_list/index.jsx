import * as React from 'react';
import Account from 'accounts/templates/accounts/accounts_list/account';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import DxTable from 'templates/components/tables/dx_table';
import {axiosGetRequest} from 'templates/components/axios_requests';

class AccountsList extends React.PureComponent {
  state = {
    accounts: [],
    accounts_filtered: [],
    show_deactivated: false,
    clicked_id: 0
  };

  componentDidMount() {
    axiosGetRequest('get_accounts')
      .then((response) => {
        this.setState({accounts: response}, () => this.excludeInactiveAccounts());
      })
      .catch((error) => console.log(error));
  }

  excludeInactiveAccounts = () => {
    const accounts_filtered = this.state.accounts.filter((account) => account.is_active);
    this.setState({accounts_filtered});
  };

  includeInactiveAccounts = () => {
    this.setState({accounts_filtered: this.state.accounts});
  };

  onTableClick = (clicked_row) => {
    this.setState({clicked_id: clicked_row.id});
  };

  onButtonClick = () => {
    this.setState({clicked_id: -1});
  };

  closeModal = () => {
    this.setState({clicked_id: 0});
  };

  showDeactivatedChange = () => {
    this.setState({show_deactivated: !this.state.show_deactivated}, () => {
      this.state.show_deactivated ? this.includeInactiveAccounts() : this.excludeInactiveAccounts();
    });
  };

  render() {
    const {accounts, accounts_filtered, clicked_id, show_deactivated} = this.state;

    return (
      <>
        <div className='d-flex'>
          <button className='css_button' onClick={this.onButtonClick}>
            Створити акаунт
          </button>
          <div className='form-check ml-auto'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='showInProgress'
              checked={show_deactivated}
              onChange={this.showDeactivatedChange}
            />
            <label className='form-check-label' htmlFor='showInProgress'>
              Неактивні
            </label>
          </div>
        </div>

        <DxTable
          rows={accounts_filtered}
          columns={columns}
          defaultSorting={[{columnName: 'id', direction: 'desc'}]}
          colWidth={col_width}
          onRowClick={this.onTableClick}
          // height={main_div_height}
          filter
        />
        <Modal open={clicked_id !== 0} onClose={this.closeModal} styles={{modal: {marginTop: 100}}}>
          <Account id={clicked_id} />
        </Modal>
      </>
    );
  }
}

const columns = [
  {name: 'legal_name', title: 'Юрид.назва'},
  {name: 'representative', title: 'Представник'},
  {name: 'phone', title: 'Тел.'},
  {name: 'mail', title: 'e-mail'},
  {name: 'edrpou', title: 'ЄДРПОУ'}
];

const col_width = [
  // {columnName: 'id', width: 50},
];

export default AccountsList;
