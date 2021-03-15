import moment from 'moment'

export const firstLetterToUpperCase = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1)

export const getMonthFromDate = (dateString) => {
    const month = moment(dateString).format('MMMM')

    return firstLetterToUpperCase(month)
}

export const getPreviousMonthFromDate = (dateString) => {
    const month = moment(dateString).subtract(1, 'months').format('MMMM')

    return firstLetterToUpperCase(month)
}
