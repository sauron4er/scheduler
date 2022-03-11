import * as React from 'react';
import DxTable from 'templates/components/tables/dx_table_for_pagination';
import Paper from '@material-ui/core/Paper';
import ReactPaginate from 'react-paginate';
import {axiosGetFileRequest, axiosPostRequest} from 'templates/components/axios_requests';
import {notify} from 'templates/components/form_modules/modules_config';
import {Loader} from 'templates/components/form_modules/loaders';
import 'static/css/pagination.css';

let delayTimeout;

class PaginatedTable extends React.Component {
  state = {
    rows: [],
    pagesCount: 0,
    page: 0,
    sort_name: '',
    sort_direction: '',
    filtering: [],
    loading: true,
    excel_loading: false
  };

  componentDidMount() {
    this.getPage(0);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.url !== this.props.url) {
      this.getPage(this.state.page);
    }
  }

  getPage = (page) => {
    const {url} = this.props;
    const {sort_name, sort_direction, filtering} = this.state;
    if (url.length) {
      let formData = new FormData();
      formData.append('sort_name', sort_name);
      formData.append('sort_direction', sort_direction);
      formData.append('filtering', JSON.stringify(filtering));

      axiosPostRequest(url + '/' + page + '/', formData)
        .then((response) => {
          this.setState({
            pagesCount: response.pagesCount,
            rows: response.rows,
            loading: false
          });
        })
        .catch((error) => notify(error));
    }
  };

  handlePageClick = (page) => {
    this.setState({page: page.selected});
    this.getPage(page.selected);
  };

  changeSorting = (column) => {
    this.setState(
      {
        sort_name: column[0].columnName,
        sort_direction: column[0].direction
      },
      () => {
        this.getPage(0);
      }
    );
  };

  changeFiltering = (data) => {
    clearTimeout(delayTimeout);
    delayTimeout = setTimeout(() => {
      this.setState({filtering: data}, () => {
        this.getPage(0);
      });
    }, 400);
  };

  getExcelClicked = () => {
    this.setState({excel_loading: true}, () => {
      this.getExcel();
    });
  };

  getExcel = () => {
    const {url} = this.props;
    const {sort_name, sort_direction, filtering} = this.state;

    let formData = new FormData();
    formData.append('sort_name', sort_name);
    formData.append('sort_direction', sort_direction);
    formData.append('filtering', JSON.stringify(filtering));
    formData.append('all_rows', '');

    axiosGetFileRequest(url + '/0/', formData, `summary_${user_name}.xlsx`)
      .then(response => {this.setState({excel_loading: false});})
      .catch((error) => notify(error));
  };

  render() {
    const {columns, defaultSorting, colWidth, onRowClick, height, redRow, filter, coloredStatus, attentionColumn, excelExport} = this.props;

    const {rows, pagesCount, loading, page, excel_loading} = this.state;

    // Таблиця бере висоту з this.props.height, якщо така є
    const paper_height = this.props.height ? this.props.height : '';

    const paging = {
      currentPage: page,
      totalPages: pagesCount
    };

    return (
      <>
        <If condition={excelExport}>
          <div className='d-flex flex-row-reverse'>
            <button className='css_button' onClick={this.getExcelClicked} disabled={excel_loading}>
              Завантажити дані в форматі Excel
            </button>
          </div>
        </If>
        <Paper className='mt-2' style={{height: paper_height ? paper_height : '100%', width: '100%'}}>
          <Choose>
            <When condition={!loading}>
              <DxTable
                rows={rows}
                columns={columns}
                colWidth={colWidth}
                onRowClick={onRowClick}
                height={height}
                paging={paging}
                redRow={redRow}
                filter={filter}
                changeSorting={this.changeSorting}
                changeFiltering={this.changeFiltering}
                coloredStatus={coloredStatus}
                attentionColumn={attentionColumn}
              />
              <If condition={pagesCount > 1}>
                <div className='mt-2'>
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
              </If>
            </When>
            <Otherwise>
              <Loader />
            </Otherwise>
          </Choose>
        </Paper>
      </>
    );
  }

  static defaultProps = {
    url: '',
    columns: [],
    defaultSorting: [],
    colWidth: [],
    onRowClick: () => {},
    height: '100%',
    redRow: '',
    filter: true,
    coloredStatus: true,
    attentionColumn: false,
    excelExport: false
  };
}

export default PaginatedTable;
