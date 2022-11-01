import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { InputSC, SelectSC } from '01/shared/ui/Fields';
import { Checkbox } from 'antd';
import { EActResourceType, EApartmentStatus } from 'myApi';
import React, { FC } from 'react';
import { SearchIcon } from 'ui-kit/icons';
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';
import {
  SearchFieldsWrapper,
  Wrapper,
} from './IndividualDevicesBySerialNumberSearch.styled';
import { IndividualDevicesViewBySerialNumberSearchProps } from './IndividualDevicesBySerialNumberSearch.types';

export const IndividualDevicesViewBySerialNumberSearch: FC<IndividualDevicesViewBySerialNumberSearchProps> = ({}) => {
  return (
    <Wrapper>
      <SearchFieldsWrapper>
        <ExtendedSearch />
        <InputSC
          prefix={<SearchIcon />}
          type='number'
          placeholder="Введите серийный номер пробера"
        />
        <SelectSC placeholder="Ресурс">
          {Object.values(EActResourceType).map((elem) => (
            <SelectSC.Option key={elem} value={elem}>
              <ResourceInfo resource={elem} />
            </SelectSC.Option>
          ))}
        </SelectSC>
        <SelectSC placeholder="Статус кв.">
          {Object.values(EApartmentStatus).map((elem) => (
            <SelectSC.Option key={elem} value={elem}>
              {elem}
            </SelectSC.Option>
          ))}
        </SelectSC>
        <Checkbox
          style={{
            color: '#272f5ae5',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            userSelect: 'none',
          }}
        >
          Показать закрытые приборы
        </Checkbox>
      </SearchFieldsWrapper>
    </Wrapper>
  );
};
