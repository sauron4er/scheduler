import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/react_toastify_settings';
import 'static/css/table.css';
import Pagination from 'templates/components/tables/pagination';
import Filter from 'templates/components/tables/filter';

function PaginatedTable(props) {
  const [state, setState] = useSetState({
    page: -1,
    pagesCount: 0,
    rows: [],
    columns: [],
    clicked_row: -1,
    filter_value: ''
  });

  useEffect(() => {
    getPage(0);
  }, []);

  useEffect(() => {
    if (props.refresh) getPage(state.page);
  }, [props.refresh]);

  function getCell(column, row, col_index) {
    for (const [key, value] of Object.entries(row)) {
      if (column.label === key) {
        if (column.label === 'color') return <td className='css_td p-1' key={col_index} style={{background: value}} />
        return <td className='css_td' key={col_index}>{value}</td>
      }
    }
  }

  function onRowClick(row_index) {
    setState({clicked_row: row_index});
    props.onRowClick(state.rows[row_index]);
  }

  function onPageClick(page) {
    setState({
      page: page.selected
    });
    getPage(page.selected);
  }

  function getPage(page) {
    if (page !== -1) {
      let formData = new FormData();
      formData.append('filter', JSON.stringify(state.filter_value));
      formData.append('look_for_name', props.lookForName);

      axiosPostRequest(props.url + '/' + page + '/', formData)
        .then((response) => {
          setState({...response});
        })
        .catch((error) => notify(error));
    }
  }

  function getWidth(label) {
    for (const column of props.colWidth) {
      if (column.label === label && column.width) {
        const x = window.matchMedia("(min-width: 700px)")
        if (x.matches) return {width: column.width};
      }
    }
  }

  function onFilterChange(filter_value) {
    setState({
      filter_value: filter_value,
      page: 0
    });
  }

  useEffect(() => {
    const delayFilter = setTimeout(() => {
      getPage(state.page);
    }, 500);

    return () => clearTimeout(delayFilter);
  }, [state.filter_value]);

  function isClicked(row_index) {
    return row_index === state.clicked_row ? ' css_table_row_clicked' : null
  }

  return (
    <>
      <Filter value={state.filter_value} onChange={onFilterChange} />
      <div className='css_table_wrapper' style={{overflowX: 'auto'}}>
        <table className='table table-sm css_table bg-white'>
          <thead className=''>
            <tr>
              <For each='column' of={state.columns} index='idx'>
                <th key={idx} scope='col' className='css_th' style={getWidth(column.label)}>
                  {column.title}
                </th>
              </For>
            </tr>
          </thead>
          <tbody>
            <For each='row' of={state.rows} index='row_idx'>
              <tr
                className={`css_tr ${isClicked(row_idx)}`}
                onClick={(e) => onRowClick(row_idx)}
                key={row_idx}
              >
                <For each='column' of={state.columns} index='col_index'>
                  {getCell(column, row, col_index)}
                </For>
              </tr>
            </For>
          </tbody>
        </table>
        <Pagination onPageClick={onPageClick} pagesCount={state.pagesCount} activePage={state.page} />
      </div>
    </>
  );
}

PaginatedTable.defaultProps = {
  onRowClick: () => {},
  filter: true,
  url: '',
  colWidth: {},
  refresh: false, // Якщо змінюється на true, таблиця оновлює дані з серверу
  lookForId: 0 // Якщо не 0, то таблиця відкриває сторінку, на якій розміщений цей ід і підсвічує його
};

export default PaginatedTable;
