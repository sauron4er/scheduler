import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import {axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/form_modules/modules_config';
import 'static/css/pagination.css';
import {Loader} from 'templates/components/form_modules/loaders';


function PaginatedTable(props) {
  const [page, setPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [rows, setRows] = useState([]);
  // const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.url) getPage(page);
  }, [page]);

  useEffect(() => {
    if (columns.length) console.log(columns);
  }, [columns])

  function test(new_rows) {
    console.log(': ' + new_rows);
  }

  function handlePageClick(page) {
    setLoading(true);
    setPage(page.selected);
  }

  function getPage(page) {
    let formData = new FormData();
    formData.append('filter', JSON.stringify(''));

    axiosPostRequest(props.url + '/' + page + '/', formData)
      .then((response) => {
        setPagesCount(response.pagesCount);
        setRows(response.rows, (new_rows) => test(new_rows));
        setColumns(response.columns);
        setLoading(false);

      })
      .then(() => test())
      .catch((error) => notify(error));
  }

  return (
    <Choose>
      <When condition={!loading}>
        <div className='table-responsive'>
          <table className='table table-sm table-bordered table-hover'>
            <thead className='thead-light'>
              <tr>
                <For each='column' of={columns} index='idx'>
                  <th key={idx} scope='col'>{column.title}</th>
                </For>
              </tr>
            </thead>
            <tbody>
              {/*<For each='row' of={rows} index='row-idx'>*/}
              {/*  <tr key='row-idx'>*/}
              {/*    <td>{row[columns[0].name]}</td>*/}
              {/*  </tr>*/}
              {/*</For>*/}
              {/*<tr>*/}
              {/*  <th scope='row'>1</th>*/}
              {/*  <td>Mark</td>*/}
              {/*  <td>Otto</td>*/}
              {/*  <td>@mdo</td>*/}
              {/*</tr>*/}
              {/*<tr>*/}
              {/*  <th scope='row'>2</th>*/}
              {/*  <td>Jacob</td>*/}
              {/*  <td>Thornton</td>*/}
              {/*  <td>@fat</td>*/}
              {/*</tr>*/}
              {/*<tr>*/}
              {/*  <th scope='row'>3</th>*/}
              {/*  <td>Larry</td>*/}
              {/*  <td>the Bird</td>*/}
              {/*  <td>@twitter</td>*/}
              {/*</tr>*/}
            </tbody>
          </table>
          <If condition={props.pagination}>
            <ReactPaginate
              previousLabel={'Назад'}
              nextLabel={'Вперед'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pagesCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              // subContainerClassName={'pages pagination'}
              activeClassName={'css_page_active'}
              pageClassName={'css_page btn btn-sm'}
              previousClassName={'css_page btn btn-sm'}
              nextClassName={'css_page btn btn-sm'}
            />
          </If>
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
  url: ''
};

export default PaginatedTable;
