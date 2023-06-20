import React, { FC, useMemo } from 'react';
import { intersection } from 'lodash';
import { DistrictData } from 'types';
import { MapWrapper } from './DistrictsMap.styled';
import { Props } from './DistrictsMap.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import {
  useRenderDistricts,
  useRenderPlacemarks,
  useRenderTextPlacemarks,
} from 'hooks/ymaps/utils';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { findPolygonCenter } from 'utils/findPolygonCenter';
import { prepareAppointments } from './DistrictsMap.utils';
import warningPlacemark from 'hooks/ymaps/placemarks/warningPlacemark.svg';
import warningInactivePlacemark from 'hooks/ymaps/placemarks/warningInactivePlacemark.svg';

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
}) => {
  const { mapRef, map } = useYMaps();

  const filteredDistrictsList = useMemo(() => {
    if (!selectedDistrict) return districtsList;

    return districtsList.filter((elem) => elem.id === selectedDistrict);
  }, [districtsList, selectedDistrict]);

  const districtsDataList: DistrictData[] = useMemo(() => {
    return getPayloadFromDistricts(filteredDistrictsList).map((elem) => ({
      ...elem,
      onClick: handleSelectDistrict,
    }));
  }, [filteredDistrictsList, handleSelectDistrict]);

  useRenderDistricts(map, districtsDataList);

  const districtTitles = useMemo(() => {
    if (selectedDistrict) return [];

    return getPayloadFromDistricts(filteredDistrictsList).map((elem) => {
      const districtAppointmentsCounting = appointmentsCounting?.[elem.id];

      const count =
        (districtAppointmentsCounting?.distributed || 0) +
        (districtAppointmentsCounting?.notDistributed || 0);

      return {
        text: `${elem.name} ${count ? `(${count})` : ''}`,
        coords: findPolygonCenter(elem.coordinates[0]),
      };
    });
  }, [filteredDistrictsList, selectedDistrict, appointmentsCounting]);

  useRenderTextPlacemarks(map, districtTitles);

  const preparedAppointments = useMemo(
    () =>
      prepareAppointments(appointmentsInDistrict || []).map((elem) => ({
        placemarkIconLink:
          intersection(
            elem.appointments.map((elem) => elem.id),
            selectedAppointmentsIds,
          ).length !== 0
            ? warningPlacemark
            : warningInactivePlacemark,
        coords: [elem.address.latitude || 0, elem.address.longitude || 0] as [
          number,
          number,
        ],
        onClick: () => handleSelectHousingStock(elem),
        count: elem.appointments.length,
      })),
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
        />
      )}
      <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
    </MapWrapper>
  );
};
