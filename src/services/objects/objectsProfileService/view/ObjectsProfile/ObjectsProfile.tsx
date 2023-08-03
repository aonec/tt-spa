import { PageHeader } from 'ui-kit/shared/PageHeader';
import { Radio } from 'antd';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
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
  ReportMenuListItem,
} from './ObjectsProfile.styled';
import { HeaderInject, ObjectsProfileProps } from './ObjectsProfile.types';
import { ContextMenuElement } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';

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
  const [isShowReportsList] = useState(true);

  const menuButtons = useMemo(() => {
    const reportsMenuItems: ContextMenuElement[] = [
      {
        title: 'Групповой отчёт',
        onClick: handleExportGroupReport,
        hidden: !isPermitionToDownloadGroupReport,
      },
      {
        title: 'Отчёт по СОИ',
        onClick: openSoiReportModal,
        hidden: !isPermitionToDownloadSOIReport,
      },
      {
        title: 'Отчёт по обратной магистрали',
        onClick: openFeedFlowBackReportModal,
        hidden: !isPermitionToDownloadFeedBackFlowReport,
      },
      {
        title: 'Сводный отчёт по ГВС',
        onClick: openFlowTemperatureDeviationReportModal,
        hidden: !isPermitionToCreateFeedFlowPipeTemperatureReport,
      },
      {
        title: 'Сводный отчёт по ИПУ',
        onClick: openHeatIndividualDevicesReportModal,
        hidden: !isPermitionToCreateObjectAndIPUReport,
      },
    ].map((elem) => ({
      ...elem,
      title: <ReportMenuListItem>{elem.title}</ReportMenuListItem>,
    }));

    return [
      {
        title: 'Создать объект',
        onClick: handleCreateObject,
        hidden: !isPermitionToCreateObjectAndIPUReport,
      },
      {
        title: 'Выгрузить отчет',
        onClick: () => {},
      },
      ...(isShowReportsList ? reportsMenuItems : []),
      {
        title: 'Создать оключение ресурса на объекте',
        onClick: handleOpenChooseResourceDisconnectionModal,
        hidden: !isPermitionToCreateResourceDisconnection,
      },
    ];
  }, [
    handleExportGroupReport,
    isPermitionToDownloadGroupReport,
    openSoiReportModal,
    isPermitionToDownloadSOIReport,
    openFeedFlowBackReportModal,
    isPermitionToDownloadFeedBackFlowReport,
    openFlowTemperatureDeviationReportModal,
    isPermitionToCreateFeedFlowPipeTemperatureReport,
    openHeatIndividualDevicesReportModal,
    isPermitionToCreateObjectAndIPUReport,
    handleCreateObject,
    isShowReportsList,
    handleOpenChooseResourceDisconnectionModal,
    isPermitionToCreateResourceDisconnection,
  ]);

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
