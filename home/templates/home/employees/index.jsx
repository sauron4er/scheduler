import React, { useState } from "react";
import {createRoot} from 'react-dom/client';
import Employees from "./employees";
import Profile from "./profile/profile";

function EmployeesIndex() {
  const [mainDiv, setMainDiv] = useState(document.getElementById('bundle').parentNode.id);

  return (
    <Choose>
      <When condition={mainDiv === 'employees'}>
        <Employees />
      </When>
      <When condition={mainDiv === 'profile'}>
        <Profile />
      </When>
    </Choose>
  );
}

const container = document.getElementById('bundle');
const root = createRoot(container);
root.render(<EmployeesIndex />);
