/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'underscore'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pager: {} }
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.orderBy !== nextProps.orderBy) {
      this.setPage(this.props.initialPage)
    }
  }

  setPage(page) {
    let items = this.props.items
    let pager = this.state.pager

    if (page < 1 || page > pager.totalPages) {
      return
    }

    // get new pager object for specified page
    pager = Pagination.getPager(items.length, page)

    // get new page of items from items array
    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1)

    // update state
    this.setState({ pager: pager })

    // call change page function in parent component
    this.props.onChangePage(pageOfItems)
  }

  static getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1

    // default page size is 10
    pageSize = pageSize || 5

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize)

    let startPage, endPage
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1
      endPage = totalPages
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1
        endPage = 10
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9
        endPage = totalPages
      } else {
        startPage = currentPage - 5
        endPage = currentPage + 4
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1)

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }

  render() {
    let pager = this.state.pager

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null
    }

    return (
      <div className="container">
        <div className="center">
          <a className="page" onClick={() => this.setPage(1)}>
            First
          </a>

          <a
            className="page"
            onClick={() => this.setPage(pager.currentPage - 1)}
          >
            Previous
          </a>

          {pager.pages.map((page, index) => (
            <a
              key={index}
              className={pager.currentPage === page ? 'activePage' : 'page'}
              onClick={() => this.setPage(page)}
            >
              {page}
            </a>
          ))}
          <a
            className="page"
            onClick={() => this.setPage(pager.currentPage + 1)}
          >
            Next
          </a>
          <a className="page" onClick={() => this.setPage(pager.totalPages)}>
            Last
          </a>
        </div>
      </div>
    )
  }
}

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    orderBy: PropTypes.string,
    initialPage: PropTypes.number
}

const defaultProps = {
    initialPage: 1
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps

export default Pagination
