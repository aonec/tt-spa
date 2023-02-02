import React, { FC, useState } from 'react';
import { Empty } from 'antd';
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
import { getFiltersList } from './ReportViewPage.utils';
import { ReportViewTable } from './ReportViewTable';

const formId = 'report-form-id';

export const ReportViewPage: FC<ReportViewPageProps> = ({
  reportType,
  existingCities,
  houseManagements,
  addressesWithHouseManagements,
  filtrationValues,
  setFiltrationValues,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleApply = () => {
    const form = document.forms.namedItem(formId);

    if (!form) return;

    form.requestSubmit();

    setIsOpen(false);
  };

  const filtersViewArray = getFiltersList(filtrationValues, houseManagements);

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
          handleApply={handleApply}
          extendedSearchContent={
            <ReportFiltrationForm
              existingCities={existingCities}
              houseManagements={houseManagements}
              addressesWithHouseManagements={addressesWithHouseManagements}
              filtrationValues={filtrationValues}
              formId={formId}
              setFiltrationValues={setFiltrationValues}
            />
          }
        >
          <FiltrationInfoWrapper>
            <FiltrationInfoList>
              {Boolean(filtersViewArray.length) &&
                filtersViewArray.map((text) => (
                  <FiltrationInfoItem key={text}>{text}</FiltrationInfoItem>
                ))}
              {!filtersViewArray.length && (
                <FiltrationInfoItem>Фильтры не выбраны</FiltrationInfoItem>
              )}
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
      <ReportViewTable />
    </Wrapper>
  );
};
