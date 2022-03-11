import * as React from 'react';
import ReactDOM from 'react-dom';
import Schedule from "home/templates/home/schedule";
import Clients from "home/templates/home/clients";

class Home extends React.Component {
  state = {
    main_div: document.getElementById('bundle').parentNode.id
  };

  render() {
    return (
      <Choose>
        <When condition={this.state.main_div === 'schedule'}>
          <Schedule />
        </When>
        <When condition={this.state.main_div === 'clients'}>
          <Clients />
        </When>

      </Choose>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('bundle'));