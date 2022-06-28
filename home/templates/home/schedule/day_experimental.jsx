import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {store, view} from '@risingstack/react-easy-state';
import './schedule.css';
import {Loader} from "templates/components/form_modules/loaders";

function DayExperimental(props) {
  const [state, setState] = useSetState({
    loading: false
  });

  return (
    <Choose>
      <When condition={!state.loading}>
        <table className='table table-sm css_day_table'>
          <thead>
            <tr>
              <th scope='col' className={`${state.today_index === 1 ? 'today' : ''} scheduler_th`}>
                {props.date}
              </th>
            </tr>
          </thead>
          <tbody>
        <tr>
          <td>'8:00'</td>
        </tr>
        <tr>
          <td>'9:00'</td>
        </tr>
        <tr>
          <td>'10:00'</td>
        </tr>
        <tr>
          <td>'11:00'</td>
        </tr>
        <tr>
          <td>'12:00'</td>
        </tr>
        <tr>
          <td>'13:00'</td>
        </tr>
        <tr>
          <td>'14:00'</td>
        </tr>
        <tr>
          <td>'15:00'</td>
        </tr>
        <tr>
          <td>'16:00'</td>
        </tr>
        <tr>
          <td>'17:00'</td>
        </tr>
        <tr>
          <td>'18:00'</td>
        </tr>
      </tbody>
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('08:00')} week={state.week_dates} time='8:00' />*/}
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('09:00')} week={state.week_dates} time='9:00' />*/}
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('10:00')} week={state.week_dates} time='10:00' />*/}
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('11:00')} week={state.week_dates} time='11:00' />*/}
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('12:00')} week={state.week_dates} time='12:00' />*/}
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('13:00')} week={state.week_dates} time='13:00' />*/}
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('14:00')} week={state.week_dates} time='14:00' />*/}
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('15:00')} week={state.week_dates} time='15:00' />*/}
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('16:00')} week={state.week_dates} time='16:00' />*/}
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('17:00')} week={state.week_dates} time='17:00' />*/}
            {/*<Row week_number={props.week_number} visits={getVisitsByTime('18:00')} week={state.week_dates} time='18:00' />*/}
          {/*</tbody>*/}
        </table>
      </When>
      <Otherwise>
        <Loader />
      </Otherwise>
    </Choose>
  );
}

DayExperimental.defaultProps = {
  date: ''
};

export default view(DayExperimental);
