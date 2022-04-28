import React from 'react';
import ReactPaginate from 'react-paginate';
import '../../../static/css/pagination.css';

function Pagination(props) {
  //TODO відключити кнопку ... (.break_me)
  //TODO розтягти <а> на всю ширину і висоту <li>
  return (
    <ReactPaginate
      breakLabel='...'
      previousLabel='Назад'
      nextLabel='Вперед'
      onPageChange={props.onPageClick}
      pageRangeDisplayed={5}
      pageCount={props.pagesCount}
      renderOnZeroPageCount={null}
      containerClassName={'pagination'}
      activeClassName={'css_page_active'}
      breakClassName={'break-me'}
      pageClassName={'css_page btn btn-sm'}
      previousClassName={'css_page btn btn-sm'}
      nextClassName={'css_page btn btn-sm'}
      marginPagesDisplayed={2}
    />
  );
}

Pagination.defaultProps = {
  onPageClick: () => {},
  pagesCount: 1,
  activePage: -1
};

export default Pagination;
