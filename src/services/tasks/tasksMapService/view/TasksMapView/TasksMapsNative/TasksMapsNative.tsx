import { useYMaps } from '@pbe/react-yandex-maps';
import {
  BuildingWithTasksResponse,
  HousingStockWithTasksResponse,
} from 'api/types';
import { FC, useEffect, useRef, useState } from 'react';
import { MapZoomControl } from 'ui-kit/shared/MapZoomControl';
import { Wrapper } from './TasksMapsNative.styled';
import { TasksMapsNativeProps } from './TasksMapsNative.types';
import {
  getClusterIcon,
  getExtendedMapMarkerlayoutLink,
  getTaskPlacemarkerLink,
} from './TasksMapsNative.utils';
import { EXTENDED_PLACEMARK_ZOOM_LIMIT } from './TasksMapsNative.constants';
import { tasksMapService } from 'services/tasks/tasksMapService/tasksMapService.model';

export const TasksMapsNative: FC<TasksMapsNativeProps> = ({
  buildingsWithTasks,
  handleClickMarker,
  selectedHousingStockId,
  organizationCoordinates,
  clearSelectedHousingStock,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const ymaps = useYMaps(['Map', 'Placemark', 'Clusterer']);
  const [map, setMap] = useState<ymaps.Map | null>(null);
  const [clusterer, setClusterer] = useState<ymaps.Clusterer | null>(null);
  const [isExtendedPlacemark, setIsExtendedPlacemarks] =
    useState<boolean>(false);
  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    if (!map) return;

    return tasksMapService.inputs.handleSetCoordinates.watch((coords) => {
      map.setCenter(coords, 18, { duration: 200 });
    }).unsubscribe;
  }, [map]);

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

  const [clickStart, setClickStart] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setClickStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!clickStart) return;

    const { x, y } = clickStart;
    const threshold = 5; // Порог для минимального движения

    if (
      Math.abs(event.clientX - x) < threshold &&
      Math.abs(event.clientY - y) < threshold
    ) {
      clearSelectedHousingStock();
    }

    setClickStart(null);
  };

  return (
    <Wrapper>
      <div
        ref={mapRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ width: '100%', height: '84vh' }}
      />
      {map && <MapZoomControl map={map} />}
    </Wrapper>
  );
};
