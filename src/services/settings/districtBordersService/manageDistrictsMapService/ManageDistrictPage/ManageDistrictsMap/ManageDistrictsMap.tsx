import React, { FC, useMemo, useState } from 'react';
import { useRenderDistricts } from 'hooks/ymaps/utils';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { getPayloadFromDistricts } from 'utils/districtsData';
import { MapWrapper } from './ManageDistrictsMap.styled';
import { Props } from './ManageDistrictsMap.types';
import { SelectDistrictActionModal } from './SelectDistrictActionModal';
import { DistrictColorsList } from 'dictionaries';

export const ManageDistrictsMap: FC<Props> = ({
  organizationCoordinates,
  existingDistricts,
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    null,
  );

  const { map, mapRef } = useYMaps(organizationCoordinates);

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(existingDistricts).map((elem) => ({
      ...elem,
      onClick: () => setSelectedDistrictId(elem.id),
    }));
  }, [existingDistricts, setSelectedDistrictId]);

  useRenderDistricts(map, preparedExistingDistricts);

  const selectedDistrict = useMemo(() => {
    if (!selectedDistrictId) return null;

    return (
      preparedExistingDistricts.find(({ id }) => id === selectedDistrictId) ||
      null
    );
  }, [selectedDistrictId, preparedExistingDistricts]);

  const selectedDistrictColors = useMemo(() => {
    if (!selectedDistrict) return null;

    return (
      DistrictColorsList.find((elem) => elem.type === selectedDistrict.type) ||
      null
    );
  }, [selectedDistrict]);

  return (
    <>
      {selectedDistrict && selectedDistrictColors && (
        <SelectDistrictActionModal
          strokeColor={selectedDistrictColors.strokeColor}
          fillColor={selectedDistrictColors.color}
          isOpen={Boolean(selectedDistrictId)}
          districtName={selectedDistrict.name}
          handleClose={() => setSelectedDistrictId(null)}
        />
      )}
      <MapWrapper>
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      </MapWrapper>
    </>
  );
};
