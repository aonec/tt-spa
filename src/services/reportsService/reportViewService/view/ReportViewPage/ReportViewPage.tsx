import React, { FC, useState } from 'react';
import {
  ExtendedSearchWrapper,
  FiltrationInfoItem,
  FiltrationInfoList,
  FiltrationInfoWrapper,
  HeaderTitleWrapper,
  HeaderWrapper,
  Wrapper,
} from './ReportViewPage.styled';
import { ReportViewPageProps } from './ReportViewPage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { PageHeader } from '01/shared/ui/PageHeader';
import {
  ReportIconsDictionary,
  ReportNamesDictionary,
} from 'services/reportsService/view/ReportsPage/ReportsPage.constants';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { ReportFiltrationForm } from './ReportFiltrationForm';
import { Button } from 'ui-kit/Button';
import { Empty } from 'antd';

export const ReportViewPage: FC<ReportViewPageProps> = ({ reportType }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Wrapper>
      <GoBack />
      <HeaderWrapper>
        <PageHeader
          title={
            <HeaderTitleWrapper>
              {ReportIconsDictionary[reportType]}
              <div>{ReportNamesDictionary[reportType]}</div>
            </HeaderTitleWrapper>
          }
        />
      </HeaderWrapper>
      <ExtendedSearchWrapper>
        <ExtendedSearch
          isOpen={isOpen}
          handleOpen={() => setIsOpen(true)}
          handleClose={() => setIsOpen(false)}
          handleApply={() => setIsOpen(false)}
          extendedSearchContent={<ReportFiltrationForm />}
        >
          <FiltrationInfoWrapper>
            <FiltrationInfoList>
              <FiltrationInfoItem>Фильтры не выбраны</FiltrationInfoItem>
            </FiltrationInfoList>
            <Button size="small" sidePadding={16}>
              Скачать отчет
            </Button>
          </FiltrationInfoWrapper>
        </ExtendedSearch>
      </ExtendedSearchWrapper>
      {!isOpen && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Выберите фильтры для формирования отчёта"
        />
      )}
    </Wrapper>
  );
};
