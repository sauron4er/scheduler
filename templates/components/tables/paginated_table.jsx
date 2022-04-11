import React, {useEffect} from 'react';
import useSetState from 'templates/hooks/useSetState';
import {axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/form_modules/modules_config';
import 'static/css/pagination.css';
import './table.css';
import {Loader} from 'templates/components/form_modules/loaders';
import ReactPaginate from 'react-paginate';

function PaginatedTable(props) {
  const [state, setState] = useSetState({
    page: 0,
    pagesCount: 0,
    rows: [],
    columns: [],
    loading: true,
    clicked_row: -1
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
      loading: true,
      page: page.selected
    });
    getPage(page.selected);
  }

  function getPage(page) {
    let formData = new FormData();
    formData.append('filter', JSON.stringify(''));

    axiosPostRequest(props.url + '/' + page + '/', formData)
      .then((response) => {
        setState({
          pagesCount: response.pagesCount,
          rows: response.rows,
          columns: response.columns,
          loading: false
        });
      })
      .catch((error) => notify(error));
  }

  function getWidth(label) {
    for (const column of props.colWidth) {
      if (column.label === label) return {width: column.width}
    }
  }

  //TODO Зробити додавання клієнта модульним, а таблицю розширити на його місце вліво.

  return (
    <Choose>
      <When condition={!state.loading}>
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
          <ReactPaginate
            previousLabel={'Назад'}
            nextLabel={'Вперед'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={state.pagesCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageClick}
            containerClassName={'pagination'}
            // subContainerClassName={'pages pagination'}
            activeClassName={'css_page_active'}
            pageClassName={'css_page btn btn-sm'}
            previousClassName={'css_page btn btn-sm'}
            nextClassName={'css_page btn btn-sm'}
          />
        </div>
      </When>
      <Otherwise>
        <Loader />
      </Otherwise>
    </Choose>
  );
}

PaginatedTable.defaultProps = {
  onRowClick: () => {},
  filter: true,
  url: '',
  colWidth: {}
};

export default PaginatedTable;
