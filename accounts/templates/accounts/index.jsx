import * as React from 'react';
import ReactDOM from 'react-dom';
import AccountsList from "accounts/templates/accounts/accounts_list";

class Accounts extends React.Component {
  state = {
    main_div: document.getElementById('bundle').parentNode.id
  };

  render() {
    return (
      <Choose>
        <When condition={this.state.main_div === 'accounts_list'}>
          <AccountsList />
        </When>
      </Choose>
    );
  }
}

ReactDOM.render(<Accounts />, document.getElementById('bundle'));
