import React, { Component } from "react";
import ReactPaginate from 'react-paginate';
import './style.scss'

const Pagination = ({ forcePage, onPageChange, totalPages }) => {
  if (!totalPages){
    return null
  }
    return (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          breakLinkClassName={"pagination__break"}
          breakLabel={'...'}
          breakClassName={'break-me'}
          onPageChange={onPageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageClassName={"pagination__li"}
          pageLinkClassName={"pagination__link"}
          forcePage={forcePage}
        />
    )
}

export default Pagination;