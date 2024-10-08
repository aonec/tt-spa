import { useYMaps } from '@pbe/react-yandex-maps';
import {
  BuildingWithTasksResponse,
  HousingStockWithTasksResponse,
} from 'api/types';
import React, { FC, useEffect, useRef, useState } from 'react';
import { MapZoomControl } from '../../../../../../ui-kit/shared/MapZoomControl';
import { Wrapper } from './TasksMapsNative.styled';
import { TasksMapsNativeProps } from './TasksMapsNative.types';
import {
  getClusterIcon,
  getExtendedMapMarkerlayoutLink,
  getTaskPlacemarkerLink,
} from './TasksMapsNative.utils';
import { EXTENDED_PLACEMARK_ZOOM_LIMIT } from './TasksMapsNative.constants';

export const TasksMapsNative: FC<TasksMapsNativeProps> = ({
  buildingsWithTasks,
  handleClickMarker,
  selectedHousingStockId,
  organizationCoordinates,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const ymaps = useYMaps(['Map', 'Placemark', 'Clusterer']);
  const [map, setMap] = useState<ymaps.Map | null>(null);
  const [clusterer, setClusterer] = useState<ymaps.Clusterer | null>(null);
  const [isExtendedPlacemark, setIsExtendedPlacemarks] =
    useState<boolean>(false);
  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: organizationCoordinates || [55.6366, 51.8245],
      zoom: 15,
    });

    const clusterer = new ymaps.Clusterer();

    clusterer.createCluster = (center, geoObjects) => {
      const housingStocksWithTasksList = geoObjects.reduce((acc, elem) => {
        const housingStockWithTasks = (
          elem.state as { housingStockData?: HousingStockWithTasksResponse }
        ).housingStockData;

        if (!housingStockWithTasks) return acc;

        return [...acc, housingStockWithTasks];
      }, [] as HousingStockWithTasksResponse[]);

      const clusterPlacemark = new ymaps.Placemark(
        center,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: getClusterIcon(housingStocksWithTasksList).iconHrev,
          iconImageSize: [51, 51],
        },
      );

      clusterPlacemark.events.add('click', () => {
        map.setCenter(center, map.getZoom() + 2, { duration: 200 });
      });

      return clusterPlacemark;
    };

    map.events.add('boundschange', (event) => {
      setIsExtendedPlacemarks(
        (event.originalEvent as unknown as { newZoom: number }).newZoom >=
          EXTENDED_PLACEMARK_ZOOM_LIMIT,
      );
    });

    setMap(map);
    setClusterer(clusterer);

    map.geoObjects.add(clusterer as unknown as ymaps.ObjectManager);
  }, [ymaps, mapRef, organizationCoordinates]);

  useEffect(() => {
    if (!ymaps?.Placemark || !clusterer) return;

    clusterer.removeAll();

    const placemarks = buildingsWithTasks.map((buildingWithTasks) => {
      const isSelected =
        selectedHousingStockId === buildingWithTasks.building?.id;

      const { iconHrev, size, isExtended } =
        isExtendedPlacemark || isSelected
          ? getExtendedMapMarkerlayoutLink(buildingWithTasks.tasks || [])
          : getTaskPlacemarkerLink(buildingWithTasks.tasks || []);

      const center = [
        buildingWithTasks.building?.coordinates?.latitude || 0,
        buildingWithTasks.building?.coordinates?.longitude || 0,
      ];

      const placemark = new ymaps.Placemark(
        center,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: iconHrev,
          iconImageSize: [size.width, size.height],
          iconOffset: [
            -(size.width / 2),
            (isExtendedPlacemark || isSelected) && isExtended ? -20 : 0,
          ],
          zIndex: isSelected ? 1000 : undefined,
        },
      );

      (
        placemark.state as { housingStockData?: BuildingWithTasksResponse }
      ).housingStockData = buildingWithTasks;

      placemark.events.add('click', () => {
        handleClickMarker(buildingWithTasks);
        map?.setCenter(center, map.getZoom(), { duration: 200 });
      });

      return placemark;
    });

    clusterer.add(placemarks);
  }, [
    clusterer,
    buildingsWithTasks,
    map,
    ymaps,
    handleClickMarker,
    isExtendedPlacemark,
    selectedHousingStockId,
  ]);

  useEffect(() => {
    if (isCentered || !map) return;

    const buildingWithCoordinates = buildingsWithTasks?.find((elem) =>
      Boolean(elem.building?.coordinates),
    );

    const { latitude, longitude } =
      buildingWithCoordinates?.building?.coordinates || {};

    if (!latitude || !longitude) return;

    const center = [latitude, longitude];

    map.setCenter(center, map.getZoom());

    setIsCentered(true);
  }, [buildingsWithTasks, map, isCentered]);

  return (
    <Wrapper>
      <div ref={mapRef} style={{ width: '100%', height: '84vh' }} />
      {map && <MapZoomControl map={map} />}
    </Wrapper>
  );
};
