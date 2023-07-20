import { PageHeader } from 'ui-kit/sharedComponents/PageHeader';
import { Radio } from 'antd';
import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ApartmentsListContainer } from 'services/objects/displayApartmentsListService';
import { ObjectsListContainer } from 'services/objects/displayObjectsListService';
import { DisplayPersonalNumbersListContainer } from 'services/objects/displayPersonalNumbersListService';
import { SearchType } from '../../objectsProfileService.types';
import {
  Wrapper,
  ContentWrapper,
  SearchTypesWrapper,
  FiltrationWrapper,
  HeaderCustomContentWrapper,
  SizeWrapper,
} from './ObjectsProfile.styled';
import { HeaderInject, ObjectsProfileProps } from './ObjectsProfile.types';

const objectListComponentsLookup: {
  [key: string]: FC<HeaderInject>;
} = {
  [SearchType.Houses]: ObjectsListContainer,
  [SearchType.Apartments]: ApartmentsListContainer,
  [SearchType.PersonaNumbers]: DisplayPersonalNumbersListContainer,
};

export const ObjectsProfile: FC<ObjectsProfileProps> = ({
  handleOpenChooseResourceDisconnectionModal,
  searchType,
  openSoiReportModal,
  handleCreateObject,
  openFeedFlowBackReportModal,
  handleExportGroupReport,
  isPermitionToCreateObjectAndIPUReport,
  isPermitionToCreateResourceDisconnection,
  isPermitionToDownloadFeedBackFlowReport,
  isPermitionToDownloadGroupReport,
  isPermitionToDownloadSOIReport,
  isPermitionToCreateFeedFlowPipeTemperatureReport,
  openHeatIndividualDevicesReportModal,
  openFlowTemperatureDeviationReportModal,
}) => {
  const menuButtons = useMemo(
    () => [
      {
        title: 'Создать объект',
        onClick: handleCreateObject,
        hidden: !isPermitionToCreateObjectAndIPUReport,
      },
      {
        title: 'Выгрузка группового отчёта',
        onClick: handleExportGroupReport,
        hidden: !isPermitionToDownloadGroupReport,
      },
      {
        title: 'Выгрузить отчёт по СОИ',
        onClick: openSoiReportModal,
        hidden: !isPermitionToDownloadSOIReport,
      },
      {
        title: 'Выгрузить отчёт по обратной магистрали',
        onClick: openFeedFlowBackReportModal,
        hidden: !isPermitionToDownloadFeedBackFlowReport,
      },
      {
        title: 'Выгрузить сводный отчёт по ГВС',
        onClick: openFlowTemperatureDeviationReportModal,
        hidden: !isPermitionToCreateFeedFlowPipeTemperatureReport,
      },
      {
        title: 'Создать оключение ресурса на объекте',
        onClick: handleOpenChooseResourceDisconnectionModal,
        hidden: !isPermitionToCreateResourceDisconnection,
      },
      {
        title: 'Выгрузить сводный отчёт по ИПУ',
        onClick: openHeatIndividualDevicesReportModal,
        hidden: !isPermitionToCreateObjectAndIPUReport,
      },
    ],
    [
      handleCreateObject,
      isPermitionToCreateObjectAndIPUReport,
      handleExportGroupReport,
      isPermitionToDownloadGroupReport,
      openSoiReportModal,
      isPermitionToDownloadSOIReport,
      openFeedFlowBackReportModal,
      isPermitionToDownloadFeedBackFlowReport,
      openFlowTemperatureDeviationReportModal,
      isPermitionToCreateFeedFlowPipeTemperatureReport,
      handleOpenChooseResourceDisconnectionModal,
      isPermitionToCreateResourceDisconnection,
      openHeatIndividualDevicesReportModal,
    ],
  );

  const Header = useCallback(
    ({ children }: { children: ReactNode }) => {
      return (
        <FiltrationWrapper>
          <PageHeader
            title="Объекты"
            contextMenu={{
              menuButtons,
            }}
          />
          <SizeWrapper>
            <SearchTypesWrapper>
              <Radio.Group value={searchType}>
                <Link to={`/buildings/${SearchType.Houses}`}>
                  <Radio value={SearchType.Houses}>Поиск по адресу</Radio>
                </Link>
                <Link to={`/buildings/${SearchType.Apartments}`}>
                  <Radio value={SearchType.Apartments}>Поиск по квартире</Radio>
                </Link>
                <Link to={`/buildings/${SearchType.PersonaNumbers}`}>
                  <Radio value={SearchType.PersonaNumbers}>
                    Поиск по лицевому счету
                  </Radio>
                </Link>
              </Radio.Group>
            </SearchTypesWrapper>
            <HeaderCustomContentWrapper>{children}</HeaderCustomContentWrapper>
          </SizeWrapper>
        </FiltrationWrapper>
      );
    },
    [menuButtons, searchType],
  );

  const objectsProfileComponent = useMemo(() => {
    if (!searchType) return null;

    const Component = objectListComponentsLookup[searchType];

    if (!Component) return null;

    return <Component Header={Header} />;
  }, [searchType, Header]);

  return (
    <>
      <Wrapper>
        <ContentWrapper>{objectsProfileComponent}</ContentWrapper>
      </Wrapper>
    </>
  );
};
