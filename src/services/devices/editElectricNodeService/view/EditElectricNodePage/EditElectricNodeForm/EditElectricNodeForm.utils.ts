import moment from "moment";

export const getDatePickerValue = (
    date?: number | null
  ): moment.Moment | undefined => {
    return(date ? moment(date) : void 0)};