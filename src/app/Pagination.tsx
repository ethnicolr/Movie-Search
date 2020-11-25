import React from "react";
import ReactPaginate from "react-paginate";
import "./style.scss";

interface onChange {
  (selectedItem: {selected: number}): void
  }
  
interface TypePagination {
  totalPages: number,
  forcePage: number,
  onPageChange: onChange
}

const Pagination = ({ forcePage, onPageChange, totalPages }: TypePagination) => {
  if (!totalPages) {
    return null;
  }
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      breakLinkClassName={"pagination__break"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      // subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      pageClassName={"pagination__li"}
      pageLinkClassName={"pagination__link"}
      forcePage={forcePage}
      nextLabel={""}
      previousLabel={""}
      nextClassName={"pagination__next"}
      previousClassName={"pagination__previous"}
    />
  );
};

export default Pagination;
