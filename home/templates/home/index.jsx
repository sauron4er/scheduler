import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import Schedule from 'home/templates/home/schedule/schedule';
import Clients from 'home/templates/home/clients/clients';
import Employees from 'home/templates/home/employees/employees';

function Home() {
  const [mainDiv, setMainDiv] = useState(document.getElementById('bundle').parentNode.id);

  return (
    <Choose>
      <When condition={mainDiv === 'schedule'}>
        <Schedule />
      </When>
      <When condition={mainDiv === 'clients'}>
        <Clients />
      </When>
      <When condition={mainDiv === 'employees'}>
        <Employees />
      </When>
    </Choose>
  );
}

const container = document.getElementById('bundle');
const root = createRoot(container);
root.render(<Home />);
