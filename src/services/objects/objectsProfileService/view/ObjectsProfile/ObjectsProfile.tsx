import { PageHeader } from 'ui-kit/shared_components/PageHeader';
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
  openHeatIndividualDevicesReportModal,
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
      handleOpenChooseResourceDisconnectionModal,
      handleCreateObject,
      openFeedFlowBackReportModal,
      openSoiReportModal,
      handleExportGroupReport,
      isPermitionToCreateObjectAndIPUReport,
      isPermitionToCreateResourceDisconnection,
      isPermitionToDownloadFeedBackFlowReport,
      isPermitionToDownloadGroupReport,
      isPermitionToDownloadSOIReport,
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
          <SearchTypesWrapper>
            <Radio.Group value={searchType}>
              <Link to={`/objects/${SearchType.Houses}`}>
                <Radio value={SearchType.Houses}>Поиск по адресу</Radio>
              </Link>
              <Link to={`/objects/${SearchType.Apartments}`}>
                <Radio value={SearchType.Apartments}>Поиск по квартире</Radio>
              </Link>
              <Link to={`/objects/${SearchType.PersonaNumbers}`}>
                <Radio value={SearchType.PersonaNumbers}>
                  Поиск по лицевому счету
                </Radio>
              </Link>
            </Radio.Group>
          </SearchTypesWrapper>
          <HeaderCustomContentWrapper>{children}</HeaderCustomContentWrapper>
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
