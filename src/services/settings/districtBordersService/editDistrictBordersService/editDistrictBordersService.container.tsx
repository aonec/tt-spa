import React, { useEffect, useMemo } from 'react';
import { EditDistrictBordersMap } from './EditDistrictBordersMap';
import { useUnit } from 'effector-react';
import { currentUserService } from 'services/currentUserService';
import {
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './editDistrictBordersService.api';
import { editDistrictBordersService } from './editDistrictBordersService.models';
import { useHistory, useParams } from 'react-router-dom';
import {
  getDistrictJsonData,
  getPayloadFromDistrict,
} from 'utils/districtsData';
import { updateDistrictMutation } from '../manageDistrictsMapService/manageDistrictsMapService.api';

const {
  gates: { DistrictBordersGate },
} = editDistrictBordersService;

export const EditDistrictBordersContainer = () => {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const { organizationCoordinates } = useUnit({
    organizationCoordinates:
      currentUserService.outputs.$organizationCoordinates,
  });

  const { data: existingHousingStocks, pending: isLoadingHousingStocks } =
    useUnit(existingHousingStocksQuery);

  const { data: existingDistricts, pending: isLoadingDistricts } = useUnit(
    existingDistrictsQuery,
  );

  const { start: updateDistrict, pending: isLoadingUpdateDistrict } = useUnit(
    updateDistrictMutation,
  );

  const districtData = useMemo(() => {
    const district = existingDistricts?.find((elem) => elem.id === id) || null;

    if (!district) return null;

    return getPayloadFromDistrict(district);
  }, [existingDistricts, id]);

  const handleUpdateDistrictBorder = (coordinates: number[][]) => {
    if (!districtData) return;

    updateDistrict({
      id,
      additionalInfo: getDistrictJsonData({
        districtColor: districtData.type,
        districtPolygonCoordinates: coordinates,
      }),
    });
  };

  useEffect(() => {
    return updateDistrictMutation.finished.success.watch(() => {
      history.push('/districtBordersSettings/manageDistricts');
    }).unsubscribe;
  }, [history]);

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
      />
    </>
  );
};
