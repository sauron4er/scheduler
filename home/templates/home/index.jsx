import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom';
import Schedule from "home/templates/home/schedule/schedule";
import Clients from "home/templates/home/clients/clients";

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

const container = document.getElementById('bundle');
const root = createRoot(container);
root.render(<Home />);

// ReactDOM.render(<Home />, document.getElementById('bundle'));