import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Address,
  City,
  FooterWrapper,
  MapPanel,
  MapPanelHeader,
  PanelContent,
  Wrapper,
} from './BuildingsMap.styled';
import { Props } from './BuildingsMap.types';
import { useYMaps } from 'hooks/ymaps/useYMaps';
import { useRenderPlacemarks } from 'hooks/ymaps/utils';
import { Input } from 'ui-kit/Input';
import { SearchIcon } from 'ui-kit/icons';
import { Loader } from 'ui-kit/Loader';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { getBuildingProfilePath } from 'utils/getBuildingProfilePath';
import { SpaceLine } from 'ui-kit/SpaceLine';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { Button } from 'ui-kit/Button';
import { Link } from 'react-router-dom';
import { getBuildingPlacmearksWithTasks } from './BuildingsMap.utils';
import { MapZoomControl } from 'ui-kit/shared/MapZoomControl';

export const BuildingsMap: FC<Props> = ({
  isLoading,
  existingHousingStocks,
  organizationCoordinates,
}) => {
  const { mapRef, map } = useYMaps(organizationCoordinates);

  const [selectedBuildingId, setSelectedBuilding] = useState<number | null>(
    null,
  );

  const selectedBuilding = useMemo(() => {
    const building = existingHousingStocks?.items?.find(
      (elem) => elem.id === selectedBuildingId,
    );

    return building || null;
  }, [existingHousingStocks?.items, selectedBuildingId]);

  const buildingsPlacemarks = useMemo(
    () =>
      getBuildingPlacmearksWithTasks(
        existingHousingStocks,
        existingHousingStocks?.items?.map(({ id }) => id) || [],
        selectedBuildingId ? [selectedBuildingId] : [],
        (id) => setSelectedBuilding(selectedBuildingId === id ? null : id),
      ),
    [existingHousingStocks, selectedBuildingId],
  );

  useRenderPlacemarks(map, buildingsPlacemarks);

  const mapPanelSearch = (
    <MapPanelHeader>
      {isLoading && <Loader show />}
      <Input small prefix={<SearchIcon />} placeholder="Введите адрес" />
    </MapPanelHeader>
  );

  useEffect(() => {
    if (!selectedBuilding?.coordinates || !map) return;

    map.setCenter(
      [
        selectedBuilding.coordinates.latitude,
        selectedBuilding.coordinates.longitude,
      ],
      17,
      {
        duration: 400,
      },
    );
  }, [map, selectedBuilding]);

  const buildingHref = useMemo(
    () =>
      selectedBuilding
        ? `/buildings/${getBuildingProfilePath(
            selectedBuilding.houseCategory,
          )}/${selectedBuilding?.id}`
        : '',
    [selectedBuilding],
  );

  return (
    <Wrapper>
      <MapPanel>
        {!selectedBuildingId && mapPanelSearch}
        {selectedBuilding && (
          <>
            <MapPanelHeader>
              <Address to={buildingHref}>
                {getBuildingAddress(selectedBuilding)}
                <City>{`${selectedBuilding.address?.mainAddress?.city}`}</City>
              </Address>
            </MapPanelHeader>
            <SpaceLine noTop />
            <PanelContent>
              <CommonInfo
                items={[
                  {
                    key: 'Город',
                    value: selectedBuilding.address?.mainAddress?.city,
                  },
                  {
                    key: 'Количество квартир',
                    value: selectedBuilding.numberOfApartments,
                  },
                  {
                    key: 'Количество задач',
                    value: <b>{selectedBuilding.numberOfTasks}</b>,
                  },
                ]}
              />
            </PanelContent>
            <FooterWrapper>
              <Link to={buildingHref}>
                <Button size="s">Перейти в профиль объекта</Button>
              </Link>
            </FooterWrapper>
          </>
        )}
      </MapPanel>
      <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
      {map && <MapZoomControl map={map} />}
    </Wrapper>
  );
};
