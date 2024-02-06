import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { GoBack } from 'ui-kit/shared/GoBack';
import { Button } from 'ui-kit/Button';
import { PencilIcon } from 'ui-kit/icons';
import { findPolygonCenter } from 'utils/findPolygonCenter';
import {
  getPayloadFromDistrict,
  getPayloadFromDistricts,
} from 'utils/districtsData';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { useRenderDistricts, useRenderPlacemarks } from 'hooks/ymaps/utils';
import {
  getBuildingPlacmearks,
  getSelectedHouses,
} from '../../createDistrictBorderMapService/view/CreateDistrictBorderMapPage/CreateDistrictBorderMapPage.utils';
import { Header, MapWrapper } from './EditDistrictBordersMap.styled';
import { Props } from './EditDistrictBordersMap.types';
import { SelectedHousingStocksPanel } from './SelectedHousingStocksPanel';
import { MapZoomControl } from 'ui-kit/shared/MapZoomControl';
import { compareHouses } from '../editDistrictBordersService.utils';

export const EditDistrictBordersMap: FC<Props> = ({
  organizationCoordinates,
  existingDistricts,
  districtId,
  existingHousingStocks,
  isLoadingUpdateDistrict,
  handleUpdateDistrictBorder,
}) => {
  const { map, mapRef } = useYMaps(organizationCoordinates);

  const [selectedHousingStocks, setSelectedHousingStocks] = useState<number[]>(
    [],
  );

  const toggleHousingStock = useCallback(
    (id: number) => {
      setSelectedHousingStocks((prev) => {
        if (prev.includes(id)) return prev.filter((elem) => elem !== id);

        return [...prev, id];
      });
    },
    [setSelectedHousingStocks],
  );

  const [bufferedPolygonCoordinates, setBufferedPolygonCoordinates] = useState<
    number[][][] | null
  >(null);

  const [isEditing, setIsEditing] = useState(true);

  const preparedExistingDistricts = useMemo(() => {
    if (!existingDistricts) return [];

    return getPayloadFromDistricts(
      existingDistricts.filter(({ id }) => id !== districtId),
    );
  }, [districtId, existingDistricts]);

  useRenderDistricts(map, preparedExistingDistricts);

  const editingDistrict = useMemo(() => {
    if (!existingDistricts) return null;

    const district = existingDistricts.find((elem) => elem.id === districtId);

    if (!district) return null;

    const payload = getPayloadFromDistrict(district, isEditing);

    return (
      payload && {
        ...payload,
        coordinates: bufferedPolygonCoordinates || payload.coordinates,
      }
    );
  }, [bufferedPolygonCoordinates, districtId, existingDistricts, isEditing]);

  const editindDistrictArray = useMemo(
    () => (editingDistrict ? [editingDistrict] : []),
    [editingDistrict],
  );

  const {
    savedDistricts: {
      [editingDistrict?.id as string]: editingdDistrictPolygon,
    },
  } = useRenderDistricts(map, editindDistrictArray);

  const housesInDistrict = useMemo(
    () => getSelectedHouses(editingdDistrictPolygon, existingHousingStocks),
    [editingdDistrictPolygon, existingHousingStocks],
  );

  useEffect(() => {
    setSelectedHousingStocks(housesInDistrict.map(({ id }) => id));
  }, [housesInDistrict, setSelectedHousingStocks]);

  const buildingsPlacemarks = useMemo(
    () =>
      getBuildingPlacmearks(
        existingHousingStocks,
        housesInDistrict.map(({ id }) => id),
        selectedHousingStocks,
        () => {},
      ),
    [existingHousingStocks, housesInDistrict, selectedHousingStocks],
  );

  useRenderPlacemarks(map, buildingsPlacemarks);

  useEffect(() => {
    if (!editingDistrict || !map) return;

    map.setCenter(findPolygonCenter(editingDistrict.coordinates[0]));
  }, [map, editingDistrict]);

  const handleApply = useCallback(() => {
    const coordinates = editingdDistrictPolygon?.geometry?.getCoordinates();

    if (!coordinates) return;

    setBufferedPolygonCoordinates(coordinates);
    setIsEditing(false);
  }, [editingdDistrictPolygon?.geometry]);

  const housesByFront = housesInDistrict.reduce((acc: number[], house) => {
    return [...acc, house.id];
  }, []);

  const housesByServer = editindDistrictArray?.[0]?.houses?.reduce(
    (acc, house) => {
      return [...acc, house.id as number];
    },
    [] as number[],
  );

  const { housesForDelete, housesForAdd } = compareHouses(
    housesByFront,
    housesByServer,
  );

  console.log({ housesByServer, housesByFront });
  console.log({ housesForDelete, housesForAdd });

  const handleUpdate = useCallback(() => {
    if (!bufferedPolygonCoordinates) return;

    handleUpdateDistrictBorder(bufferedPolygonCoordinates[0]);
  }, [bufferedPolygonCoordinates, handleUpdateDistrictBorder]);

  return (
    <div>
      <Header>
        <GoBack />
        {isEditing && <Button onClick={handleApply}>Подтвердить</Button>}
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} icon={<PencilIcon />}>
            Редактировать
          </Button>
        )}
      </Header>
      <MapWrapper>
        {!isEditing && (
          <SelectedHousingStocksPanel
            housesInDistrict={housesInDistrict}
            selectedHousingStocks={selectedHousingStocks}
            toggleHousingStock={toggleHousingStock}
            handleCancel={() => setIsEditing(true)}
            isLoading={isLoadingUpdateDistrict}
            handleUpdate={handleUpdate}
            editindDistrictArray={editindDistrictArray}
          />
        )}
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
        {map && <MapZoomControl map={map} />}
      </MapWrapper>
    </div>
  );
};
