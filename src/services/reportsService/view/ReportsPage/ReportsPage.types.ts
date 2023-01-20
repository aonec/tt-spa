import { ReactNode } from 'react';

export type ReportsPageProps = {};

export type ReportSelectItem = {
  icon: ReactNode;
  reportType: ReportType;
};

export enum ReportType {
  IndividualDevices = 'IndividualDevices',
  ActsJournal = 'ActsJournal',
  HousingDevices = 'HousingDevices',
  Homeowners = 'Homeowners',
  Employee = 'Employee',
}
