import React, { FC, useMemo } from 'react';
import { MapWrapper } from './DistrictsMap.styled';
import { Props } from './DistrictsMap.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import {
  useRenderDistricts,
  useRenderPlacemarks,
  useRenderTextPlacemarks,
} from 'hooks/ymaps/utils';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { DistrictData } from 'types';
import { findPolygonCenter } from 'utils/findPolygonCenter';
import { prepareAppointments } from './DistrictsMap.utils';
import warningPlacemark from 'hooks/ymaps/placemarks/warningPlacemark.svg';
import { DistributeAppointmentsPanel } from '../DistributeAppointmentsPanel';

export const DistrictsMap: FC<Props> = ({
  districtsList,
  handleSelectDistrict,
  selectedDistrict,
  appointmentsInDistrict,
  handleSelectHousingStock,
  selectedAppointmentsIds,
  handleSelectAppointments,
  isLoadingAppointments
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

    return getPayloadFromDistricts(filteredDistrictsList).map((elem) => ({
      text: elem.name,
      coords: findPolygonCenter(elem.coordinates[0]),
    }));
  }, [filteredDistrictsList, selectedDistrict]);

  useRenderTextPlacemarks(map, districtTitles);

  const preparedAppointments = useMemo(
    () =>
      prepareAppointments(appointmentsInDistrict || []).map((elem) => ({
        placemarkIconLink: warningPlacemark,
        coords: [elem.address.latitude || 0, elem.address.longitude || 0] as [
          number,
          number,
        ],
        onClick: () => handleSelectHousingStock?.(elem),
      })),
    [appointmentsInDistrict, handleSelectHousingStock],
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
        />
      )}
      <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
    </MapWrapper>
  );
};
