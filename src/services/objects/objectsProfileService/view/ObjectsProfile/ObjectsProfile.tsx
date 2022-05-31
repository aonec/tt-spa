import { PageHeader } from '01/shared/ui/PageHeader';
import { Radio } from 'antd';
import React, { FC } from 'react';
import { SearchTypesWrapper, Wrapper } from './ObjectsProfile.styled';
import { ObjectsProfileProps } from './ObjectsProfile.types';

export const ObjectsProfile: FC<ObjectsProfileProps> = ({
  handleExportGroupReport,
  searchType,
  onChangeSearchType,
}) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};
