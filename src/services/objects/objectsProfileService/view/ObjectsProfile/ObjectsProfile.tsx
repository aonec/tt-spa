import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import React, { FC, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../../../../01/shared/ui/PageHeader';
import { ApartmentsListContainer } from '../../../displayApartmentsListService';
import { ObjectsListContainer } from '../../../displayObjectsListService';
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
  [SearchType.PersonaNumbers]: () => <></>,
};

export const ObjectsProfile: FC<ObjectsProfileProps> = ({
  handleExportGroupReport,
  searchType,
}) => {
  const menuButtons = useMemo(
    () => [
      {
        title: 'Выгрузка группового отчёта',
        onClick: handleExportGroupReport,
      },
    ],
    [handleExportGroupReport]
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
          </Radio.Group>
        </SearchTypesWrapper>
        <ContentWrapper>{objectsProfileComponent}</ContentWrapper>
      </Wrapper>
    </>
  );
};
