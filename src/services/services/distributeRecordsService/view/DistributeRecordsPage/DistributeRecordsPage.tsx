import React, { FC } from 'react';
import { FiltrationWrapper, Wrapper } from './DistributeRecordsPage.styled';
import { Props } from './DistributeRecordsPage.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Select } from 'ui-kit/Select';
import { DatePicker } from 'ui-kit/DatePicker';
import { DistrictsMap } from './DistrictsMap';

export const DistributeRecordsPage: FC<Props> = ({ districtsList }) => {
  return (
    <Wrapper>
      <FiltrationWrapper>
        <AddressSearchContainer fields={[SearchFieldType.City]} />
        <Select small placeholder="Выберите район">
          {districtsList.map((district) => {
            return (
              <Select.Option key={district.id} value={district.id}>
                {district.title}
              </Select.Option>
            );
          })}
        </Select>
        <DatePicker small style={{ width: 240 }} format="DD.MM.YYYY" />
      </FiltrationWrapper>
      <DistrictsMap districtsList={districtsList} />
    </Wrapper>
  );
};
