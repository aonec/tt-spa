import React from 'react';
import { useParams } from 'react-router-dom';
import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import { ReportNamesDictionary } from '../view/ReportsPage/ReportsPage.constants';

export const ReportViewContainer = () => {
  const { reportType } = useParams<{ reportType: ReportType }>();

  return <>{ReportNamesDictionary[reportType]}</>;
};
