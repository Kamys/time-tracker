import { useState } from 'react'
import { inRange } from 'lodash'

/**
 * Returns number in radius if number not in radius.
 */
export const keepRadius = (number: number, start: number, end: number = 0) => {
  if (number > start) {
    return end
  }

  if (number < end) {
    return start
  }

  return number
}

const usePagination = <T>(entries: T[], itemOnPage = 20) => {
  const maxPage = Math.ceil(entries.length / itemOnPage)
  const [currentPage, setCurrentPage] = useState(1)

  return {
    nextPage: () => {
      setCurrentPage(keepRadius(currentPage + 1, maxPage, 1))
    },
    previousPage: () => {
      setCurrentPage(keepRadius(currentPage - 1, maxPage, 1))
    },
    getCurrentItems: (): T[] => {
      const startRange = (currentPage - 1) * itemOnPage
      const endRange = startRange + itemOnPage
      return entries.slice(startRange, endRange)
    },
    getMaxPage: () => {
      return maxPage
    },
    getCurrentPage: () => {
      return currentPage
    },
    setCurrentPage: pageIndex => {
      if (inRange(pageIndex, 1, maxPage + 1)) {
        setCurrentPage(pageIndex)
      } else {
        console.error(
          `setCurrentPage: Current page should be in range from 1 on ${maxPage}`,
        )
      }
    },
  }
}

export default {
  usePagination,
}
