import React, {useEffect} from 'react';
import {store, view} from '@risingstack/react-easy-state';
import './schedule.css';

function TimeColExperimental() {
  return (
    <table className='table table-sm css_time_table'>
      <thead>
        <tr>
          <th scope='col' className='scheduler_th text-white'>Час</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='time'>8:00</td>
        </tr>
        <tr>
          <td className='time'>9:00</td>
        </tr>
        <tr>
          <td className='time'>10:00</td>
        </tr>
        <tr>
          <td className='time'>11:00</td>
        </tr>
        <tr>
          <td className='time'>12:00</td>
        </tr>
        <tr>
          <td className='time'>13:00</td>
        </tr>
        <tr>
          <td className='time'>14:00</td>
        </tr>
        <tr>
          <td className='time'>15:00</td>
        </tr>
        <tr>
          <td className='time'>16:00</td>
        </tr>
        <tr>
          <td className='time'>17:00</td>
        </tr>
        <tr>
          <td className='time'>18:00</td>
        </tr>
      </tbody>
    </table>
  );
}

export default view(TimeColExperimental);
