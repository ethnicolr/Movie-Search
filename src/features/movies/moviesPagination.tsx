import React from 'react'
import Paginate, { ReactPaginateProps } from 'react-paginate'
import style from './moviesPagination.module.css'

export type OnPageChangeCallback = ReactPaginateProps['onPageChange']

interface Props {
  currentPage: number
  pageCount: number
  onPageChange?: OnPageChangeCallback
}

export const Pagination = ({ currentPage, onPageChange, pageCount }: Props) => {
  return (
    <Paginate
      forcePage={currentPage}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      nextLabel='&rarr;'
      previousLabel='&larr;'
      containerClassName={style.pagination}
      activeClassName={style.active}
    />
  )
}
