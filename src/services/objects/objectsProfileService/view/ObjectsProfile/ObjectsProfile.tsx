import { PageHeader } from 'ui-kit/shared/PageHeader';
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
  ReportMenuListItem,
} from './ObjectsProfile.styled';
import { ContextMenuElement } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import {
  BuildingsPageSegment,
  HeaderInject,
  ObjectsProfileProps,
} from './ObjectsProfile.types';
import { Segmented } from 'ui-kit/Segmented';
import { ListIcon, MapIcon } from 'ui-kit/icons';
import { BuildingsMapContainer } from '../../buildingsMapService';

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
  setSegment,
  pageSegment,
}) => {
  const menuButtons = useMemo(() => {
    const reportsMenuItems: ContextMenuElement[] = [
      {
        id: 'group-report',
        title: 'Групповой отчёт',
        onClick: handleExportGroupReport,
        hidden: !isPermitionToDownloadGroupReport,
      },
      {
        id: 'soi-report',
        title: 'Отчёт по СОИ',
        onClick: openSoiReportModal,
        hidden: !isPermitionToDownloadSOIReport,
      },
      {
        id: 'back-feed-flow-report',
        title: 'Отчёт по обратной магистрали',
        onClick: openFeedFlowBackReportModal,
        hidden: !isPermitionToDownloadFeedBackFlowReport,
      },
      {
        id: 'hot-water-supply-report',
        title: 'Сводный отчёт по ГВС',
        onClick: openFlowTemperatureDeviationReportModal,
        hidden: !isPermitionToCreateFeedFlowPipeTemperatureReport,
      },
      {
        id: 'individual-device-report',
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
        id: 'create-object',
        title: 'Создать объект',
        onClick: handleCreateObject,
        hidden: !isPermitionToCreateObjectAndIPUReport,
      },
      {
        id: 'reports-export',
        title: 'Выгрузить отчет',
        onClick: () => {},
        children: reportsMenuItems,
      },
      {
        id: 'create-resource-disabling',
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
          >
            <Segmented<BuildingsPageSegment>
              active={pageSegment}
              items={[
                {
                  title: 'Список',
                  name: 'list',
                  icon: <ListIcon />,
                },
                {
                  title: 'На карте',
                  name: 'map',
                  icon: <MapIcon />,
                },
              ]}
              onChange={setSegment}
            />
          </PageHeader>
          {pageSegment === 'map' && children}
          {pageSegment === 'list' && (
            <SizeWrapper>
              <SearchTypesWrapper>
                <Radio.Group value={searchType}>
                  <Link to={`/buildings/${SearchType.Houses}`}>
                    <Radio value={SearchType.Houses}>Поиск по адресу</Radio>
                  </Link>
                  <Link to={`/buildings/${SearchType.Apartments}`}>
                    <Radio value={SearchType.Apartments}>
                      Поиск по квартире
                    </Radio>
                  </Link>
                  <Link to={`/buildings/${SearchType.PersonaNumbers}`}>
                    <Radio value={SearchType.PersonaNumbers}>
                      Поиск по лицевому счету
                    </Radio>
                  </Link>
                </Radio.Group>
              </SearchTypesWrapper>
              <HeaderCustomContentWrapper>
                {children}
              </HeaderCustomContentWrapper>
            </SizeWrapper>
          )}
        </FiltrationWrapper>
      );
    },
    [menuButtons, pageSegment, setSegment, searchType],
  );

  const objectsProfileComponent = useMemo(() => {
    if (pageSegment === 'map')
      return (
        <Header>
          <BuildingsMapContainer />
        </Header>
      );

    if (!searchType) return null;

    const Component = objectListComponentsLookup[searchType];

    if (!Component) return null;

    return <Component Header={Header} />;
  }, [pageSegment, Header, searchType]);

  return (
    <>
      <Wrapper>
        <ContentWrapper>{objectsProfileComponent}</ContentWrapper>
      </Wrapper>
    </>
  );
};
