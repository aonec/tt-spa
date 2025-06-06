import React, { useEffect, useMemo } from 'react';
import { EditDistrictBordersMap } from './EditDistrictBordersMap';
import { useUnit } from 'effector-react';
import {
  addHouseToDistrictMutation,
  deleteHouseInDistrictMutation,
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './editDistrictBordersService.api';
import { editDistrictBordersService } from './editDistrictBordersService.models';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getDistrictJsonData,
  getPayloadFromDistrict,
} from 'utils/districtsData';
import { updateDistrictMutation } from '../manageDistrictsMapService/manageDistrictsMapService.api';
import { currentOrganizationService } from 'services/currentOrganizationService';

const {
  gates: { DistrictBordersGate },
} = editDistrictBordersService;

export const EditDistrictBordersContainer = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { organizationCoordinates } = useUnit({
    organizationCoordinates:
      currentOrganizationService.outputs.$organizationCoordinates,
  });

  const { data: existingHousingStocks, pending: isLoadingHousingStocks } =
    useUnit(existingHousingStocksQuery);

  const { data: existingDistricts, pending: isLoadingDistricts } = useUnit(
    existingDistrictsQuery,
  );

  const { start: updateDistrict, pending: isLoadingUpdateDistrict } = useUnit(
    updateDistrictMutation,
  );

  const { start: addHouse } = useUnit(addHouseToDistrictMutation);

  const { start: deleteHouse } = useUnit(deleteHouseInDistrictMutation);

  const districtData = useMemo(() => {
    const district = existingDistricts?.find((elem) => elem.id === id) || null;

    if (!district) return null;

    return getPayloadFromDistrict(district);
  }, [existingDistricts, id]);

  const handleUpdateDistrictBorder = (coordinates: number[][]) => {
    if (!districtData) return;

    if (id) {
      updateDistrict({
        id,
        additionalInfo: getDistrictJsonData({
          districtColor: districtData.type,
          districtPolygonCoordinates: coordinates,
        }),
      });
    }
  };

  const handleAddHouse = (housesToAdd: number[]) => {
    const districtId = id;
    if (!districtId) return;

    housesToAdd.map((houseId) => addHouse({ districtId, data: houseId }));
  };

  const handleDeleteHouse = (housesToDelete: number[]) => {
    const districtId = id;
    if (!districtId) return;

    housesToDelete.map((houseId) =>
      deleteHouse({ districtId, buildingId: houseId }),
    );
  };

  useEffect(() => {
    return updateDistrictMutation.finished.success.watch(() => {
      navigate('/districtBordersSettings/manageDistricts');
    }).unsubscribe;
  }, [navigate]);

  if (!id) return null;

  return (
    <>
      <DistrictBordersGate />
      <EditDistrictBordersMap
        districtId={id}
        existingHousingStocks={existingHousingStocks}
        existingDistricts={existingDistricts}
        organizationCoordinates={organizationCoordinates}
        isLoadingHousingStocks={isLoadingHousingStocks}
        isLoadingDistricts={isLoadingDistricts}
        isLoadingUpdateDistrict={isLoadingUpdateDistrict}
        handleUpdateDistrictBorder={handleUpdateDistrictBorder}
        handleAddHouse={handleAddHouse}
        handleDeleteHouse={handleDeleteHouse}
      />
    </>
  );
};
