import React, { FC, useMemo } from 'react';
import { intersection } from 'lodash';
import { DistrictData } from 'types';
import { MapWrapper } from './DistrictsMap.styled';
import { Props } from './DistrictsMap.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { useRenderDistricts, useRenderPlacemarks } from 'hooks/ymaps/utils';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { prepareAppointments } from './DistrictsMap.utils';
import warningPlacemark from 'hooks/ymaps/placemarks/warningPlacemark.svg';
import warningInactivePlacemark from 'hooks/ymaps/placemarks/warningInactivePlacemark.svg';
import warningAvtivePlacemark from 'hooks/ymaps/placemarks/warningActivePlacemark.svg';

import { DistributeAppointmentsPanel } from '../DistributeAppointmentsPanel';

export const DistrictsMap: FC<Props> = ({
  districtsList,
  handleSelectDistrict,
  selectedDistrict,
  appointmentsInDistrict,
  handleSelectHousingStock,
  selectedAppointmentsIds,
  handleSelectAppointments,
  isLoadingAppointments,
  handleUnselectDistrict,
  appointmentsCounting,
  openDistributeAppointmentsModal,
  controllers,
  openRemoveAssignmentModal,
  organizationCoordinates,
}) => {
  const { mapRef, map } = useYMaps(organizationCoordinates);

  const filteredDistrictsList = useMemo(() => {
    if (!selectedDistrict) return districtsList;

    return districtsList.filter((elem) => elem.id === selectedDistrict);
  }, [districtsList, selectedDistrict]);

  const districtsDataList: DistrictData[] = useMemo(() => {
    return getPayloadFromDistricts(filteredDistrictsList).map((elem) => {
      const districtAppointmentsCounting = appointmentsCounting?.[elem.id];
      const count = districtAppointmentsCounting?.notDistributed || 0;

      const isShowName = selectedDistrict !== elem.id;

      const name = isShowName
        ? `${elem.name} ${count ? `(${count})` : ''}`
        : '';

      return {
        ...elem,
        name,
        onClick: handleSelectDistrict,
      };
    });
  }, [
    appointmentsCounting,
    filteredDistrictsList,
    handleSelectDistrict,
    selectedDistrict,
  ]);

  useRenderDistricts(map, districtsDataList);

  const preparedAppointments = useMemo(
    () =>
      prepareAppointments(appointmentsInDistrict || []).map((elem) => {
        const isIntersection =
          intersection(
            elem.appointments.map((elem) => elem.id),
            selectedAppointmentsIds,
          ).length !== 0;

        const isHouseActive = elem.appointments.some((elem) =>
          Boolean(elem.controllerId),
        );

        const placemarkIconLink = isIntersection
          ? warningPlacemark
          : isHouseActive
          ? warningAvtivePlacemark
          : warningInactivePlacemark;

        return {
          placemarkIconLink,
          coords: [elem.address.latitude || 0, elem.address.longitude || 0] as [
            number,
            number,
          ],
          onClick: () => handleSelectHousingStock(elem),
          count: elem.appointments.filter((elem) => !elem.controllerId).length,
        };
      }),
    [appointmentsInDistrict, handleSelectHousingStock, selectedAppointmentsIds],
  );

  useRenderPlacemarks(map, preparedAppointments);

  return (
    <MapWrapper>
      {selectedDistrict && (
        <DistributeAppointmentsPanel
          appointmentsInDistrict={appointmentsInDistrict || []}
          selectedAppointmentsIds={selectedAppointmentsIds}
          handleSelectAppointments={handleSelectAppointments}
          isLoadingAppointments={isLoadingAppointments}
          handleUnselectDistrict={handleUnselectDistrict}
          openDistributeAppointmentsModal={openDistributeAppointmentsModal}
          controllers={controllers}
          openRemoveAssignmentModal={openRemoveAssignmentModal}
        />
      )}
      <div ref={mapRef} style={{ width: '100%', height: '83vh' }} />
    </MapWrapper>
  );
};
