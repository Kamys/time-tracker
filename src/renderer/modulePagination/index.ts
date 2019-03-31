import {useState} from "react";
import {inRange} from "lodash";

const getBoundingPages = (currentPage: number, maxPages: number) => {
    const previousPage = Math.max(1, currentPage - 1);
    const nextPage = Math.min(currentPage + 1, maxPages);

    return {previousPage, nextPage};
};

const usePagination = <T>(entries: T[], itemOnPage = 20) => {
    const maxPage = Math.ceil(entries.length / itemOnPage);
    const [currentPage, setCurrentPage] = useState(1)
    const {nextPage, previousPage} = getBoundingPages(currentPage, maxPage)

    return {
        nextPage: () => {
            setCurrentPage(nextPage)
        },
        previousPage: () => {
            setCurrentPage(previousPage)
        },
        getCurrentItems: (): T[] => {
            const startRange = (currentPage - 1) * itemOnPage;
            const endRange = startRange + itemOnPage;
            return entries.slice(startRange, endRange)
        },
        getMaxPage: () => {
            return maxPage;
        },
        getCurrentPage: () => {
            return currentPage;
        },
        setCurrentPage: pageIndex => {
            if(inRange(pageIndex, 1, maxPage + 1)) {
                setCurrentPage(pageIndex)
            } else {
                console.error(`setCurrentPage: Current page should be in range from 1 on ${maxPage}`)
            }
        },
    }
}

export default {
    usePagination,
}