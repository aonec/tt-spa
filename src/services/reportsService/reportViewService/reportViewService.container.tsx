import React from 'react';
import { useParams } from 'react-router-dom';
import { ReportType } from '../view/ReportsPage/ReportsPage.types';
import { ReportViewPage } from './view/ReportViewPage';

export const ReportViewContainer = () => {
  const { reportType } = useParams<{ reportType: ReportType }>();

  if (!reportType) return null;

  return <ReportViewPage reportType={reportType} />;
};
