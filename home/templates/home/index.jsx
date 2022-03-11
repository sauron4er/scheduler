import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Schedule from "home/templates/home/schedule";
import Clients from "home/templates/home/clients";

function Home(props) {
  const [mainDiv, setMainDiv] = useState(document.getElementById('bundle').parentNode.id)

  return (
      <Choose>
        <When condition={mainDiv === 'schedule'}>
          <Schedule />
        </When>
        <When condition={mainDiv === 'clients'}>
          <Clients />
        </When>
      </Choose>
    );
}

ReactDOM.render(<Home />, document.getElementById('bundle'));