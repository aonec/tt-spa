import React, { FC } from 'react';
import { FiltrationWrapper } from './DistributeRecordsPage.styled';
import { Props } from './DistributeRecordsPage.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Select } from 'ui-kit/Select';
import { DatePicker } from 'ui-kit/DatePicker';
import { DistrictsMap } from './DistrictsMap';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { DistributeAppointmentsModal } from './DistributeAppointmentsModal';
import { GoBack } from 'ui-kit/shared/GoBack';

export const DistributeRecordsPage: FC<Props> = ({
  districtsList,
  handleSelectDistrict,
  handleUnselectDistrict,
  selectedDistrict,
  appointmentDate,
  handleSetAppointmentDate,
  appointmentsInDistrict,
  handleSelectHousingStock,
  isLoadingAppointments,
  selectedAppointmentsIds,
  handleSelectAppointments,
  appointmentsCounting,
  isDistributeAppointmentsModalOpen,
  openDistributeAppointmentsModal,
  closeDistributeAppointmentsModal,
  controllers,
  openCreateControllerModal,
  setAppointmentsToController,
  isLoadingDistributeAppointments,
  openRemoveAssignmentModal,
  organizationCoordinates,
}) => {
  return (
    <>
      <DistributeAppointmentsModal
        isModalOpen={isDistributeAppointmentsModalOpen}
        handleCloseModal={closeDistributeAppointmentsModal}
        appointmentDate={appointmentDate}
        controllers={controllers}
        openCreateControllerModal={openCreateControllerModal}
        setAppointmentsToController={setAppointmentsToController}
        selectedAppointmentsIds={selectedAppointmentsIds}
        isLoadingDistributeAppointments={isLoadingDistributeAppointments}
      />
      <GoBack />
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
          disabled={!appointmentDate}
          value={getDatePickerValue(appointmentDate)}
          onChange={(date) =>
            date && handleSetAppointmentDate(date.format('YYYY-MM-DD'))
          }
          small
          style={{ width: 240 }}
          format="DD.MM.YYYY"
          allowClear={false}
        />
      </FiltrationWrapper>
      <DistrictsMap
        districtsList={districtsList}
        handleSelectDistrict={handleSelectDistrict}
        selectedDistrict={selectedDistrict}
        appointmentsInDistrict={appointmentsInDistrict}
        handleSelectHousingStock={handleSelectHousingStock}
        selectedAppointmentsIds={selectedAppointmentsIds}
        handleSelectAppointments={handleSelectAppointments}
        isLoadingAppointments={isLoadingAppointments}
        handleUnselectDistrict={handleUnselectDistrict}
        appointmentsCounting={appointmentsCounting}
        openDistributeAppointmentsModal={openDistributeAppointmentsModal}
        controllers={controllers}
        openRemoveAssignmentModal={openRemoveAssignmentModal}
        organizationCoordinates={organizationCoordinates}
      />
    </>
  );
};
