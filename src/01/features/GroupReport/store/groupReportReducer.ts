import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { GroupReportValuesInterface } from '../components/GroupReport';

interface GroupReducerState {
  groupReportStatus: ReportModalType;
  groupReportFormState: GroupReportValuesInterface;
}

const reportName = `Выгрузка группового отчёта`;

const initialForm = {
  name: reportName,
  address: 'addressString',
  period: 'currentMonth',
  dates: [moment().startOf('month'), moment()],
  detailing: 'daily',
  hidden: true,
  subscribePeriod: 'OncePerMonth',
  nextDate: undefined,
  email: undefined,
  subscribe: false,
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

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setForm(state, action: PayloadAction<>) {
      state.groupReportFormState = action.payload;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
