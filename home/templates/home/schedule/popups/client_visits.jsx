import React, {useEffect} from 'react';
import 'static/css/schedule.css';
import useSetState from 'templates/hooks/useSetState';

function ClientVisits(props) {
  const [state, setState] = useSetState({
    table_mode: 'future', // 'past'
  });

  function toggle(e) {
    setState({table_mode: e.target.id});
  }

  return (
    <>
      <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <div id='future' className={`css_tab nav-link ${state.table_mode === 'future' ? 'active' : null}`} onClick={toggle}>
            Майбутні прийоми
          </div>
        </li>
        <li className='nav-item'>
          <div id='past' className={`css_tab nav-link ${state.table_mode === 'past' ? 'active' : null}`} onClick={toggle}>
            Історія
          </div>
        </li>
      </ul>

      <div className='p-1'>
        <table className='table table-sm css_table small'>
          <thead className='thead-light'>
          <tr>
            <th>Дата</th>
            <th>Лікар</th>
            <th>Нотатка</th>
            {/*<th></th>*/}
          </tr>
          </thead>
          <tbody>
          <For each='visit' of={state.table_mode === 'future' ? props.future : props.past} index='idx'>
            <tr key={idx}>
              <td className='css_td'>{`${visit.date}, ${visit.start}`}</td>
              <td className='css_td'>{visit.employee_name}</td>
              <td className='css_td'>{visit.note}</td>
            </tr>
          </For>
          </tbody>
        </table>
      </div>
    </>
  );
}

ClientVisits.defaultProps = {
  future: [],
  past: []
};

export default ClientVisits;
