import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Button } from 'ui-kit/Button';
import { Header, MapWrapper } from './CreateDistrictBorderMapPage.styled';
import { CreateDistrictBorderMapPageProps } from './CreateDistrictBorderMapPage.types';
import { ymaps } from './CreateDistrictBorderMapPage.types';
import { CreateDistrictFormPanel } from './CreateDistrictFormPanel';
import {
  getHousingStockItemLink,
  isPointInsidePolygon,
} from './CreateDistrictBorderMapPage.utils';

export const CreateDistrictBorderMapPage: FC<
  CreateDistrictBorderMapPageProps
> = ({ isLoadingHousingStocks, housingStocksList }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState<ymaps.Map | null>(null);

  const [district, setDistrict] = useState<ymaps.Polygon | null>(null);
  const [housingStocksGroup, setHousingStocksGroup] =
    useState<ymaps.GeoObjectCollection | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const initMaps = () => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [55.6366, 51.8245],
      zoom: 15,
      controls: [],
    });

    const housingStocksGroup = new ymaps.GeoObjectCollection();

    map.geoObjects.add(housingStocksGroup);

    setMap(map);
    setHousingStocksGroup(housingStocksGroup);
  };

  // 1
  useEffect(() => {
    ymaps.ready(initMaps);
  }, [mapRef]);

  const startEditing = () => {
    if (!map) return;

    const polygonCoordinates = district?.geometry?.getCoordinates();

    const newDistrict = new ymaps.Polygon(polygonCoordinates || [], {}, {
      editorDrawingCursor: 'crosshair',
      fillColor: 'rgba(24, 158, 233, 0.16)',
      strokeColor: '#189EE9',
      strokeWidth: 3,
    } as any);

    district && map.geoObjects.remove(district);

    map.geoObjects.add(newDistrict);

    (newDistrict.editor as any).startDrawing();

    const stateMonitor = new ymaps.Monitor(newDistrict.editor.state);

    stateMonitor.add('drawing', (newValue) => {
      newDistrict.options.set('strokeColor', newValue ? '#189EE9' : '#189Eff');
    });

    setIsEditing(true);

    setDistrict(newDistrict);
  };

  const handleApplyDistrict = () => {
    if (!map || !district) return;

    const polygonCoordinates = district.geometry?.getCoordinates();

    const mountedDistrict = new ymaps.Polygon(polygonCoordinates || [], {}, {
      editorDrawingCursor: 'crosshair',
      fillColor: 'rgba(24, 158, 233, 0.16)',
      strokeColor: '#189EE9',
      strokeWidth: 3,
    } as any);

    map.geoObjects.remove(district);

    map.geoObjects.add(mountedDistrict);

    setDistrict(mountedDistrict);

    setIsEditing(false);
  };

  const housingStocksInDistrict = useMemo(() => {
    if (!district || !housingStocksList) return [];

    const polygonCoordinates = district.geometry?.getCoordinates();

    return housingStocksList.filter((elem) =>
      isPointInsidePolygon(
        [elem.coordinates?.latitude || 0, elem.coordinates?.longitude || 0],
        polygonCoordinates?.[0] || [[0, 0]],
      ),
    );
  }, [district, housingStocksList]);

  useEffect(() => {
    if (!housingStocksGroup) return;

    const housingStockPlacemarks = housingStocksInDistrict.map((elem) => {
      const placemark = new ymaps.Placemark(
        [elem.coordinates?.latitude, elem.coordinates?.longitude],
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: getHousingStockItemLink(),
          iconImageSize: [51, 51],
        },
      );

      return placemark;
    });

    housingStocksGroup.removeAll();

    housingStockPlacemarks.forEach((elem) => {
      housingStocksGroup.add(elem);
    });
  }, [housingStocksGroup, housingStocksInDistrict]);

  return (
    <div>
      <Header>
        <GoBack />
        {!isEditing && (
          <Button onClick={startEditing}>
            {district ? 'Изменить' : 'Создать район'}
          </Button>
        )}
        {isEditing && (
          <Button onClick={handleApplyDistrict}>Подтвердить</Button>
        )}
      </Header>
      <MapWrapper>
        <div ref={mapRef} style={{ width: '100%', height: '86vh' }} />
        {!isEditing && district && (
          <CreateDistrictFormPanel
            isLoadingHousingStocks={isLoadingHousingStocks}
            housingStocksInDistrict={housingStocksInDistrict}
          />
        )}
      </MapWrapper>
    </div>
  );
};
