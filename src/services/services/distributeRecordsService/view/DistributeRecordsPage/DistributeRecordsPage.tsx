import React, { FC } from 'react';
import { FiltrationWrapper, Wrapper } from './DistributeRecordsPage.styled';
import { Props } from './DistributeRecordsPage.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Select } from 'ui-kit/Select';
import { DatePicker } from 'ui-kit/DatePicker';
import { DistrictsMap } from './DistrictsMap';
import moment from 'moment';

export const DistributeRecordsPage: FC<Props> = ({
  districtsList,
  handleSelectDistrict,
  handleUnselectDistrict,
  selectedDistrict,
  appointmentDate,
  handleSetAppointmentDate,
  appointmentsInDistrict,
}) => {
  return (
    <Wrapper>
      <FiltrationWrapper>
        <AddressSearchContainer fields={[SearchFieldType.City]} />
        <Select
          small
          placeholder="Выберите район"
          value={selectedDistrict || undefined}
          allowClear
          onChange={(value) => {
            if (!value) handleUnselectDistrict();

            if (value) handleSelectDistrict(value as string);
          }}
        >
          {districtsList.map((district) => {
            return (
              <Select.Option key={district.id} value={district.id}>
                {district.title}
              </Select.Option>
            );
          })}
        </Select>
        <DatePicker
          value={moment(appointmentDate)}
          onChange={(date) =>
            date && handleSetAppointmentDate(date.format('YYYY-MM-DD'))
          }
          small
          style={{ width: 240 }}
          format="DD.MM.YYYY"
        />
      </FiltrationWrapper>
      <DistrictsMap
        districtsList={districtsList}
        handleSelectDistrict={handleSelectDistrict}
        selectedDistrict={selectedDistrict}
        appointmentsInDistrict={appointmentsInDistrict}
      />
    </Wrapper>
  );
};
