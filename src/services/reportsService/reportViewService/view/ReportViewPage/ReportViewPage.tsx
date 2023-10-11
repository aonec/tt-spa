import React, { FC, useCallback, useState } from 'react';
import {
  ButtonSC,
  ExtendedSearchWrapper,
  FiltrationInfoItem,
  FiltrationInfoList,
  FiltrationInfoWrapper,
  HeaderTitleWrapper,
  PageHaderSC,
  Wrapper,
} from './ReportViewPage.styled';
import { ReportViewPageProps } from './ReportViewPage.types';
import { GoBack } from 'ui-kit/shared/GoBack';
import {
  ReportIconsDictionary,
  ReportNamesDictionary,
} from 'services/reportsService/view/ReportsPage/ReportsPage.constants';
import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { ReportFiltrationForm } from './ReportFiltrationForm';
import { getFiltersList } from './ReportViewPage.utils';
import { ReportViewTable } from './ReportViewTable';
import { WithLoader } from 'ui-kit/shared/WithLoader';

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
  emloyeeReportData,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleApply = useCallback(() => {
    const form = document.forms.namedItem(formId);

    if (!form) return;

    console.log("first")

    form.requestSubmit();

    setIsOpen(false);
  }, [setIsOpen]);

  const filtersViewArray = getFiltersList(filtrationValues, houseManagements);

  return (
    <Wrapper>
      <GoBack />
      <PageHaderSC
        title={
          <HeaderTitleWrapper>
            {ReportIconsDictionary[reportType]}
            <div>{ReportNamesDictionary[reportType]}</div>
          </HeaderTitleWrapper>
        }
      />
      <ExtendedSearchWrapper>
        <ExtendedSearch
          isOpen={isOpen}
          handleOpen={() => setIsOpen(true)}
          handleClose={() => setIsOpen(false)}
          handleApply={handleApply}
          handleClear={clearFiltrationValues}
          isShowClearButton
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
            <ButtonSC
              size="small"
              onClick={downloadReport}
              disabled={isLoadingReport}
              isLoading={isReportFileDownloading}
            >
              Скачать отчет
            </ButtonSC>
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
          emloyeeReportData={emloyeeReportData}
          employeeReportType={filtrationValues.employeeReportType}
        />
      </WithLoader>
    </Wrapper>
  );
};
