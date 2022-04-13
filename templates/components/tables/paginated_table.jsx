import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/form_modules/modules_config';
import './table.css';
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

  function getCell(column, row) {
    for (const [key, value] of Object.entries(row)) {
      if (column.label === key) {
        return value;
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

      axiosPostRequest(props.url + '/' + page + '/', formData)
        .then((response) => {
          setState({
            pagesCount: response.pagesCount,
            rows: response.rows,
            columns: response.columns,
            page: page
          });
        })
        .catch((error) => notify(error));
    }
  }

  function getWidth(label) {
    for (const column of props.colWidth) {
      if (column.label === label) return {width: column.width};
    }
  }

  function onFilterChange(filter_value) {
    setState({filter_value});
  }

  useEffect(() => {
    const delayFilter = setTimeout(() => {
      getPage(state.page);
    }, 500);

    return () => clearTimeout(delayFilter);
  }, [state.filter_value]);

  return (
    <>
      <Filter value={state.filter_value} onChange={onFilterChange} />
      <div className='table-responsive-lg'>
        <table className='table table-sm table-bordered table-hover css_table'>
          <thead className='thead-light'>
            <tr>
              <For each='column' of={state.columns} index='idx'>
                <th key={idx} scope='col' style={getWidth(column.label)}>
                  {column.title}
                </th>
              </For>
            </tr>
          </thead>
          <tbody>
            <For each='row' of={state.rows} index='row_index'>
              <tr
                className={row_index === state.clicked_row ? 'css_table_row_clicked' : null}
                onClick={(e) => onRowClick(row_index)}
                key={row_index}
              >
                <For each='column' of={state.columns} index='col_index'>
                  <td key={col_index}>{getCell(column, row)}</td>
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
  colWidth: {}
};

export default PaginatedTable;
