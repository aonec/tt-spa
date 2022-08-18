import moment from "moment";
import { EReportFormat, EReportType } from "myApi";

export type GetReportParams = {
  NodeId?: number;
  ReportType?: EReportType;
  From?: string;
  To?: string;
  ReportFormat?: EReportFormat;
};

export type ModalCalculatorReportFormT = {
    period:string,
      detail: string,
      begin: moment.Moment,
      end: moment.Moment,
      resource: string,
      nodeId: null | number,
      customPeriodDisabled: boolean,
}
