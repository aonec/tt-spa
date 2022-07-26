import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { GroupReportValuesInterface } from '../components/GroupReport';

interface GroupReducerState {
  groupReportStatus: ReportModalType;
  groupReportFormState: Omit<GroupReportValuesInterface, 'dates'> & {
    dates: [string, string];
  };
}

const reportName = `Выгрузка группового отчёта`;

const initialForm = {
  name: reportName,
  address: 'addressString',
  period: 'currentMonth',
  dates: [moment().startOf('month').toISOString(true), moment().toISOString(true)] as [
    string,
    string
  ],
  detailing: 'daily',
  hidden: true,
  subscribePeriod: 'OncePerMonth',
  nextDate: undefined,
  email: undefined,
  subscribe: false,
  category: undefined,
};

export type ReportModalType =
  | 'reportForm'
  | 'currentEmailForm'
  | 'otherEmailForm'
  | undefined;

const initialState = {
  groupReportStatus: undefined,
  groupReportFormState: initialForm,
} as GroupReducerState;

const reportSlice = createSlice({
  name: 'groupReport',
  initialState,
  reducers: {
    setForm(
      state,
      action: PayloadAction<
        Omit<GroupReportValuesInterface, 'dates'> & { dates: [string, string] }
      >
    ) {
      state.groupReportFormState = action.payload;
    },
    setGroupStatus(state, action: PayloadAction<ReportModalType>) {
      state.groupReportStatus = action.payload;
    },
  },
});

export const { setForm, setGroupStatus } = reportSlice.actions;
const groupReportReducer = reportSlice.reducer;
export default groupReportReducer;
