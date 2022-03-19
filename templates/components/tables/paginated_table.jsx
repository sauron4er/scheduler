import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import {axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/form_modules/modules_config';
import 'static/css/pagination.css';
import {Loader} from 'templates/components/form_modules/loaders';

class PaginatedTable extends React.PureComponent {
  state = {
    page: 0,
    pagesCount: 0,
    rows: [],
    columns: [],
    loading: true
  };

  componentDidMount() {
    this.getPage(0);
  }

  test = () => {
    console.log("rows");
    console.log(this.state.rows);
    console.log("columns");
    console.log(this.state.columns);
    console.log("------");
    this.state.rows.forEach(row => {
      for (const [key, value] of Object.entries(row)) {
      console.log(`${key}:`);
      console.log(`${value}`);
    }
    })

  };

  handlePageClick = (page) => {
    this.setState({
      loading: true,
      page: page.selected
    });
    this.getPage(page.selected);
  };

  getPage = (page) => {
    let formData = new FormData();
    formData.append('filter', JSON.stringify(''));

    axiosPostRequest(this.props.url + '/' + page + '/', formData)
      .then((response) => {
        this.setState({
          pagesCount: response.pagesCount,
          rows: response.rows,
          columns: response.columns,
          loading: false
        }, () => {
          this.test()
        });
      })
      .catch((error) => notify(error));
  };

  render() {
    const {loading, columns, rows, pagesCount} = this.state;
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
            <ReactPaginate
              previousLabel={'Назад'}
              nextLabel={'Вперед'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pagesCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
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
