import _ from 'lodash'

export const paginationRange = (totalPage, page, siblings) => {
    let pagesArrayLength = 7 + siblings
    if (pagesArrayLength >= totalPage) {
        return _.range(1, totalPage + 1)
    }
    let leftSiblingIdx = Math.max(page - siblings, 1)
    let rightSiblingIdx = Math.min(page + siblings, totalPage)
    let showLeftEllipsis = leftSiblingIdx > 2
    let showRightEllipsis = rightSiblingIdx < totalPage - 2
    if (!showLeftEllipsis && showRightEllipsis) {
        let leftItemsCount = 3 + 2 * siblings
        let leftRange = _.range(1, leftItemsCount + 1)
        return [...leftRange, "...", totalPage]
    } else if (showLeftEllipsis && !showRightEllipsis) {
        let rightItemsCount = 3 + 2 * siblings
        let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1)
        return [1, "...", ...rightRange]
    } else {
        let middleRange = _.range(leftSiblingIdx, rightSiblingIdx + 1)
        return [1, "...", ...middleRange, "...", totalPage]
    }
}