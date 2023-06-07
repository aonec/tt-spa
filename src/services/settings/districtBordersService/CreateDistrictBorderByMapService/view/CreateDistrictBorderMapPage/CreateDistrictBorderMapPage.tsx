import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Button } from 'ui-kit/Button';
import { Header, MapWrapper } from './CreateDistrictBorderMapPage.styled';
import {
  CreateDistrictBorderMapPageProps,
  DistrictColor,
} from './CreateDistrictBorderMapPage.types';
import { ymaps } from './CreateDistrictBorderMapPage.types';
import { CreateDistrictFormPanel } from './CreateDistrictFormPanel';
import {
  getDistrictColorData,
  getHousingStockItemLink,
  isPointInsidePolygon,
} from './CreateDistrictBorderMapPage.utils';
import { PencilIcon } from 'ui-kit/icons';

export const CreateDistrictBorderMapPage: FC<
  CreateDistrictBorderMapPageProps
> = ({
  isLoadingHousingStocks,
  housingStocksList,
  selectedByAddressHousingStockIds,
  selectedByAddressPoligon,
  poligonCenter,
  handleCloseDistrictEditer,
}) => {
  const byAddressList = Boolean(selectedByAddressHousingStockIds.length);

  const mapRef = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState<ymaps.Map | null>(null);

  const [district, setDistrict] = useState<ymaps.Polygon | null>(null);
  const [housingStocksGroup, setHousingStocksGroup] =
    useState<ymaps.GeoObjectCollection | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [selectedHousingStocks, setSelectedHousingStocks] = useState<number[]>(
    [],
  );

  const [districtColor, setDistrictColor] = useState<DistrictColor>(
    DistrictColor.Blue,
  );

  const [formSection, setFormSection] = useState<number>(0);

  useEffect(() => {
    if (!byAddressList) return;
    if (!map) return;

    setSelectedHousingStocks(selectedByAddressHousingStockIds);
    startEditing();

    setIsEditing(false);
  }, [selectedByAddressHousingStockIds, map, byAddressList]);

  const handleClickHousingStock = useCallback(
    (id: number) => {
      const isHousingStockIncludes = selectedHousingStocks.includes(id);

      if (!isHousingStockIncludes) {
        return setSelectedHousingStocks((prev) => [...prev, id]);
      }

      setSelectedHousingStocks((prev) => prev.filter((elem) => elem !== id));
    },
    [selectedHousingStocks, setSelectedHousingStocks],
  );

  const initMaps = () => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center:
        poligonCenter[0] && poligonCenter[1]
          ? poligonCenter
          : [55.6366, 51.8245],
      zoom: 15,
      controls: [],
    });

    const housingStocksGroup = new ymaps.GeoObjectCollection();

    map.geoObjects.add(housingStocksGroup);

    setMap(map);
    setHousingStocksGroup(housingStocksGroup);
  };

  useEffect(() => {
    ymaps.ready(initMaps);
  }, [mapRef]);

  const startEditing = useCallback(() => {
    if (!map) return;

    const polygonCoordinates = district?.geometry?.getCoordinates();

    const polygonCoordinatesByAddress = [selectedByAddressPoligon];

    const { color, strokeColor } = getDistrictColorData(districtColor);

    const newDistrict = new ymaps.Polygon(
      polygonCoordinatesByAddress || polygonCoordinates || [],
      {},
      {
        editorDrawingCursor: 'crosshair',
        fillColor: color,
        strokeColor: strokeColor,
        strokeWidth: 3,
      } as any,
    );

    district && map.geoObjects.remove(district);

    map.geoObjects.add(newDistrict);

    (newDistrict.editor as any).startDrawing();

    setIsEditing(true);

    setDistrict(newDistrict);
  }, [district, districtColor, map]);

  const handleApplyDistrict = () => {
    if (!map || !district) return;

    const polygonCoordinates = district.geometry?.getCoordinates();

    const { color, strokeColor } = getDistrictColorData(districtColor);

    const mountedDistrict = new ymaps.Polygon(polygonCoordinates || [], {}, {
      editorDrawingCursor: 'crosshair',
      fillColor: color,
      strokeColor: strokeColor,
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

    const filteredHousingStocks = housingStocksList.filter((elem) =>
      isPointInsidePolygon(
        [elem.coordinates?.latitude || 0, elem.coordinates?.longitude || 0],
        polygonCoordinates?.[0] || [[0, 0]],
      ),
    );

    byAddressList
      ? setSelectedHousingStocks(selectedByAddressHousingStockIds)
      : setSelectedHousingStocks(filteredHousingStocks.map((elem) => elem.id));

    return filteredHousingStocks;
  }, [district, housingStocksList]);

  useEffect(() => {
    if (!housingStocksGroup) return;
    if (isEditing) {
      housingStocksGroup.removeAll();
      return;
    }
    const housingStockPlacemarks = housingStocksInDistrict.map((elem) => {
      const placemark = new ymaps.Placemark(
        [elem.coordinates?.latitude, elem.coordinates?.longitude],
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: getHousingStockItemLink(
            selectedHousingStocks.includes(elem.id),
          ),
          iconImageSize: [51, 51],
        },
      );

      placemark.events.add('click', () => {
        handleClickHousingStock(elem.id);
      });

      return placemark;
    });

    housingStocksGroup.removeAll();

    housingStockPlacemarks.forEach((elem) => {
      housingStocksGroup.add(elem);
    });
  }, [
    handleClickHousingStock,
    housingStocksGroup,
    housingStocksInDistrict,
    isEditing,
    selectedHousingStocks,
  ]);

  useEffect(() => {
    if (!district) return;

    const { color, strokeColor } = getDistrictColorData(districtColor);

    district.options.set('strokeColor', strokeColor);
    district.options.set('fillColor', color);
  }, [district, districtColor]);

  return (
    <div>
      <Header>
        <div onClick={() => handleCloseDistrictEditer()}>
          <GoBack />
        </div>
        {!isEditing && (
          <Button
            onClick={startEditing}
            icon={district ? <PencilIcon /> : undefined}
          >
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
            selectedHousingStocks={selectedHousingStocks}
            handleClickHousingStock={handleClickHousingStock}
            handleCancel={startEditing}
            setDistrictColor={setDistrictColor}
            districtColor={districtColor}
            formSection={formSection}
            setFormSection={setFormSection}
          />
        )}
      </MapWrapper>
    </div>
  );
};
