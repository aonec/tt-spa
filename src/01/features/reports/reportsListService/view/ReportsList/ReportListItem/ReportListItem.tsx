import React, { FC } from 'react';
import {
  ContextMenuWrapper,
  ReportDate,
  ReportName,
  Wrapper,
} from './ReportListItem.styled';
import { ReportListItemProps } from './ReportListItem.types';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import moment from 'moment';

export const ReportListItem: FC<ReportListItemProps> = ({ report }) => {
  return (
    <Wrapper>
      <ReportName>{report.reportNameText}</ReportName>
      <ReportDate>{moment(report.timeStamp).format('DD.MM.YYYY')}</ReportDate>
      <ContextMenuWrapper>
        <ContextMenuButton
          size="small"
          menuButtons={[
            {
              title: 'Открыть отчет',
              onClick: () => {},
            },
          ]}
        />
      </ContextMenuWrapper>
    </Wrapper>
  );
};
