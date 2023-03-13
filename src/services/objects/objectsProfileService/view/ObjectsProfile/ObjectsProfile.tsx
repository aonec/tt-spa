import { PageHeader } from '01/shared/ui/PageHeader';
import { Radio } from 'antd';
import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ApartmentsListContainer } from 'services/objects/displayApartmentsListService';
import { ObjectsListContainer } from 'services/objects/displayObjectsListService';
import { DisplayPersonalNumbersListContainer } from 'services/objects/displayPersonalNumbersListService';
import { SearchType } from '../../objectsProfileService.types';
import {
  Wrapper,
  ContentWrapper,
  SearchTypesWrapper,
} from './ObjectsProfile.styled';
import { ObjectsProfileProps } from './ObjectsProfile.types';

const objectListComponentsLookup: { [key: string]: FC } = {
  [SearchType.Houses]: ObjectsListContainer,
  [SearchType.Apartments]: ApartmentsListContainer,
  [SearchType.PersonaNumbers]: DisplayPersonalNumbersListContainer,
};

export const ObjectsProfile: FC<ObjectsProfileProps> = ({
  handleOpenChooseResourceDisconnectionModal,
  searchType,
  openSoiReportModal,
  handleCreateObject,
  isAdministrator,
  openFeedFlowBackReportModal,
  handleExportGroupReport,
}) => {
  const menuButtons = useMemo(
    () => [
      {
        title: 'Выгрузка группового отчёта',
        onClick: handleExportGroupReport,
        hidden: !isAdministrator,
      },
      {
        title: 'Выгрузить отчёт по СОИ',
        onClick: openSoiReportModal,
      },
      {
        title: 'Выгрузить отчёт по обратной магистрали',
        onClick: openFeedFlowBackReportModal,
      },
      {
        title: 'Создать оключение ресурса на объекте',
        onClick: handleOpenChooseResourceDisconnectionModal,
      },
      {
        title: 'Создать объект',
        onClick: handleCreateObject,
        hidden: !isAdministrator,
      },
    ],
    [
      handleOpenChooseResourceDisconnectionModal,
      handleCreateObject,
      openFeedFlowBackReportModal,
      isAdministrator,
      openSoiReportModal,
      handleExportGroupReport,
    ],
  );

  const objectsProfileComponent = useMemo(() => {
    if (!searchType) return null;

    const Component = objectListComponentsLookup[searchType];

    if (!Component) return null;

    return <Component />;
  }, [searchType]);

  return (
    <>
      <PageHeader
        title="Объекты"
        contextMenu={{
          menuButtons,
        }}
      />
      <Wrapper>
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
        <ContentWrapper>{objectsProfileComponent}</ContentWrapper>
      </Wrapper>
    </>
  );
};
