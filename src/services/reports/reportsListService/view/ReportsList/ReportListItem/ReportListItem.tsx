import React, { FC, useMemo } from 'react';
import {
  ContextMenuWrapper,
  ReportDate,
  ReportName,
  Wrapper,
} from './ReportListItem.styled';
import { ReportListItemProps } from './ReportListItem.types';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import moment from 'moment';

export const ReportListItem: FC<ReportListItemProps> = ({
  report,
  openExistedReport,
}) => {
  const parameters = useMemo(() => {
    const lowerCaseParameters = Object.entries(report.parameters).reduce(
      (acc, [key, value]) => {
        const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);

        return { ...acc, [lowerCaseKey]: value };
      },
      {},
    );

    return {
      ...lowerCaseParameters,
      type: report.reportName,
    };
  }, [report]);

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
              onClick: () => {
                openExistedReport(parameters);
              },
            },
          ]}
        />
      </ContextMenuWrapper>
    </Wrapper>
  );
};
