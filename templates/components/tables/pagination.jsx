import React from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.css';

function Pagination(props) {
  return (
    <ReactPaginate
      previousLabel={'Назад'}
      nextLabel={'Вперед'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={props.pagesCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.onPageClick}
      forcePage={props.activePage}
      containerClassName={'pagination'}
      // subContainerClassName={'pages pagination'}
      activeClassName={'css_page_active'}
      pageClassName={'css_page btn btn-sm'}
      previousClassName={'css_page btn btn-sm'}
      nextClassName={'css_page btn btn-sm'}
      renderOnZeroPageCount={null}
    />
  );
}

Pagination.defaultProps = {
  onPageClick: () => {},
  pagesCount: 1,
  activePage: -1
};

export default Pagination;
