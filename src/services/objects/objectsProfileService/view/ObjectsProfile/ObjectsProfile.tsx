import { PageHeader } from '01/shared/ui/PageHeader';
import { Radio } from 'antd';
import React, { FC, ReactNode, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ApartmentsListContainer } from 'services/objects/displayApartmentsListService';
import { ObjectsListContainer } from 'services/objects/displayObjectsListService';
import { DisplayPersonalNumbersListContainer } from 'services/objects/displayPersonalNumbersListService';
import { ListIcon, MapIcon } from 'ui-kit/icons';
import { Segmented } from 'ui-kit/Segmented';
import { SearchType } from '../../objectsProfileService.types';
import { ObjectMapsContainer } from './objectMapsService';
import {
  Wrapper,
  ContentWrapper,
  SearchTypesWrapper,
} from './ObjectsProfile.styled';
import { ObjectsProfileProps, SegmentType } from './ObjectsProfile.types';

const objectListComponentsLookup: { [key: string]: FC } = {
  [SearchType.Houses]: ObjectsListContainer,
  [SearchType.Apartments]: ApartmentsListContainer,
  [SearchType.PersonaNumbers]: DisplayPersonalNumbersListContainer,
};

export const ObjectsProfile: FC<ObjectsProfileProps> = ({
  handleExportGroupReport,
  handleOpenChooseResourceDisconnectionModal,
  searchType,
  openSoiReportModal,
  segment,
}) => {
  const history = useHistory();

  const menuButtons = useMemo(
    () => [
      {
        title: 'Выгрузка группового отчёта',
        onClick: handleExportGroupReport,
      },
      {
        title: 'Выгрузить отчёт по СОИ',
        onClick: openSoiReportModal,
      },
      {
        title: 'Создать оключение ресурса на объекте',
        onClick: handleOpenChooseResourceDisconnectionModal,
      },
    ],
    [handleExportGroupReport, handleOpenChooseResourceDisconnectionModal]
  );

  const objectsProfileComponent = useMemo(() => {
    if (!searchType) return null;

    const Component = objectListComponentsLookup[searchType];

    if (!Component) return null;

    return <Component />;
  }, [searchType]);

  const content = useMemo(() => {
    const dictionary: { [key in SegmentType]: ReactNode } = {
      list: (
        <Wrapper>
          <SearchTypesWrapper>
            <Radio.Group value={searchType}>
              <Link to={`/objects/list/${SearchType.Houses}`}>
                <Radio value={SearchType.Houses}>Поиск по адресу</Radio>
              </Link>
              <Link to={`/objects/list/${SearchType.Apartments}`}>
                <Radio value={SearchType.Apartments}>Поиск по квартире</Radio>
              </Link>
              <Link to={`/objects/list/${SearchType.PersonaNumbers}`}>
                <Radio value={SearchType.PersonaNumbers}>
                  Поиск по лицевому счету
                </Radio>
              </Link>
            </Radio.Group>
          </SearchTypesWrapper>
          <ContentWrapper>{objectsProfileComponent}</ContentWrapper>
        </Wrapper>
      ),
      map: <ObjectMapsContainer />,
    };

    return dictionary[segment];
  }, [segment, searchType, objectsProfileComponent]);

  return (
    <>
      <PageHeader
        title="Объекты"
        contextMenu={{
          menuButtons,
          size: 'small',
        }}
        hasPaddings={segment === 'map'}
      >
        <Segmented<SegmentType>
          active={segment}
          items={[
            { name: 'list', title: 'Список', icon: <ListIcon /> },
            { name: 'map', title: 'На карте', icon: <MapIcon /> },
          ]}
          onChange={(value) =>
            history.push(value === 'list' ? '/objects/list' : '/objects/map')
          }
        />
      </PageHeader>
      {content}
    </>
  );
};
