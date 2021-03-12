import moment from 'moment'

const isDateNull = (date) => {
    return date === null ? null : moment(date)
}
export default isDateNull
