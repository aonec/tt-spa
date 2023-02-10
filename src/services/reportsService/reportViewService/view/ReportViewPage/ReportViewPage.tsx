import React, { FC, useCallback, useMemo, useState } from 'react';
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
import { WithLoader } from 'ui-kit/shared_components/WithLoader';

const formId = 'report-form-id';

export const ReportViewPage: FC<ReportViewPageProps> = ({
  reportType,
  existingCities,
  houseManagements,
  addressesWithHouseManagements,
  filtrationValues,
  setFiltrationValues,
  isLoadingReport,
  individualDevicesReportData,
  actJournalReportData,
  housingMeteringDevicesReportData,
  homeownersReportData,
  downloadReport,
  isReportFileDownloading,
  clearFiltrationValues,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleApply = useCallback(() => {
    const form = document.forms.namedItem(formId);

    if (!form) return;

    form.requestSubmit();

    setIsOpen(false);
  }, [setIsOpen]);

  const filtersViewArray = getFiltersList(filtrationValues, houseManagements);

  const isShowClearButton = useMemo(() => {
    return Object.values(filtrationValues).some((value) => {
      const isValueArray = Array.isArray(value);

      if (isValueArray) {
        return Boolean(value.length);
      }

      return Boolean(value);
    });
  }, [filtrationValues]);

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
          title={isShowClearButton ? undefined : 'Фильтры'}
          isOpen={isOpen}
          handleOpen={() => setIsOpen(true)}
          handleClose={() => setIsOpen(false)}
          handleApply={handleApply}
          handleClear={clearFiltrationValues}
          isShowClearButton={isShowClearButton}
          extendedSearchContent={
            <ReportFiltrationForm
              existingCities={existingCities}
              houseManagements={houseManagements}
              addressesWithHouseManagements={addressesWithHouseManagements}
              filtrationValues={filtrationValues}
              formId={formId}
              setFiltrationValues={setFiltrationValues}
              reportType={reportType}
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
            <Button
              size="small"
              sidePadding={16}
              onClick={downloadReport}
              isLoading={isReportFileDownloading}
            >
              Скачать отчет
            </Button>
          </FiltrationInfoWrapper>
        </ExtendedSearch>
      </ExtendedSearchWrapper>
      <WithLoader isLoading={isLoadingReport}>
        <ReportViewTable
          reportType={reportType}
          individualDevicesReportData={individualDevicesReportData}
          actJournalReportData={actJournalReportData}
          reportOption={filtrationValues.reportOption}
          housingMeteringDevicesReportData={housingMeteringDevicesReportData}
          homeownersReportData={homeownersReportData}
        />
      </WithLoader>
    </Wrapper>
  );
};
