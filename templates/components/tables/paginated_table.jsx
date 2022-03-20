import * as React from 'react';
import ReactPaginate from 'react-paginate';
import {axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/form_modules/modules_config';
import 'static/css/pagination.css';
import './table.css'
import {Loader} from 'templates/components/form_modules/loaders';

class PaginatedTable extends React.PureComponent {
  state = {
    page: 0,
    pagesCount: 0,
    rows: [],
    columns: [],
    loading: true,
    clicked_row: -1
  };

  componentDidMount() {
    this.getPage(0);
  }

  getCell = (column, row) => {
    for (const [key, value] of Object.entries(row)) {
      if (column.name === key) {
        return value;
      }
    }
  };

  onRowClick = (row_index) => {
    this.setState({clicked_row: row_index})
    this.props.onRowClick(this.state.rows[row_index])
  };

  onPageClick = (page) => {
    this.setState({
      loading: true,
      page: page.selected
    });
    console.log(page.selected);
    this.getPage(page.selected);
  };

  getPage = (page) => {
    let formData = new FormData();
    formData.append('filter', JSON.stringify(''));

    axiosPostRequest(this.props.url + '/' + page + '/', formData)
      .then((response) => {
        this.setState(
          {
            pagesCount: response.pagesCount,
            rows: response.rows,
            columns: response.columns,
            loading: false
          }
        );
      })
      .catch((error) => notify(error));
  };

  render() {
    const {loading, columns, rows, pagesCount, clicked_row} = this.state;
    return (
      <Choose>
        <When condition={!loading}>
          <div className='table-responsive'>
            <table className='table table-sm table-bordered table-hover'>
              <thead className='thead-light'>
                <tr>
                  <For each='column' of={columns} index='idx'>
                    <th key={idx} scope='col'>
                      {column.title}
                    </th>
                  </For>
                </tr>
              </thead>
              <tbody>
                <For each='row' of={rows} index='row_index'>
                  <tr className={row_index === clicked_row ? "css_table_row_clicked" : null} onClick={e => this.onRowClick(row_index)} key={row_index}>
                    <For each='column' of={columns} index='col_index'>
                      <td key={col_index}>{this.getCell(column, row)}</td>
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
              pageCount={pagesCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.onPageClick}
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

  static defaultProps = {
    onRowClick: () => {},
    filter: true,
    url: ''
  };
}

export default PaginatedTable;
