import React, { FC } from 'react';
import { Wrapper } from './ReportListItem.styled';
import { ReportListItemProps } from './ReportListItem.types';

export const ReportListItem: FC<ReportListItemProps> = ({ report }) => {
  return <Wrapper>{report.reportNameText}</Wrapper>;
};
