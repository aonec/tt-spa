import { PageHeader } from '01/shared/ui/PageHeader';
import { Radio } from 'antd';
import React, { FC } from 'react';
import { ObjectsListContainer } from 'services/objects/displayObjectsListService';
import { SearchType } from '../../objectsProfileService.types';
import { ContentWrapper, SearchTypesWrapper } from './ObjectsProfile.styled';
import { ObjectsProfileProps } from './ObjectsProfile.types';

const objectListComponents: { [key: string]: FC } = {
  [SearchType.Address]: ObjectsListContainer,
  [SearchType.Apartment]: () => <></>,
  [SearchType.PersonaNumber]: () => <></>,
};

export const ObjectsProfile: FC<ObjectsProfileProps> = ({
  handleExportGroupReport,
  searchType,
  onChangeSearchType,
}) => {
  const ObjectListComponent = searchType && objectListComponents[searchType];

  return (
    <div>
      <PageHeader
        title="Объекты"
        contextMenu={{
          menuButtons: [
            {
              title: 'Выгрузка группового отчёта',
              onClick: handleExportGroupReport,
            },
          ],
        }}
      />
      <SearchTypesWrapper>
        <Radio.Group
          value={searchType}
          onChange={(e) => onChangeSearchType(e.target.value)}
        >
          <Radio value="address">Поиск по адресу</Radio>
          <Radio value="apartment">Поиск по квартире</Radio>
          <Radio value="personalNumber">Поиск по лицевому счету</Radio>
        </Radio.Group>
      </SearchTypesWrapper>
      <ContentWrapper>
        {ObjectListComponent && <ObjectListComponent />}
      </ContentWrapper>
    </div>
  );
};
