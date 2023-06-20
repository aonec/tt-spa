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
import {
  ControlButtonsWrapper,
  Header,
  MapWrapper,
} from './CreateDistrictBorderMapPage.styled';
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
import { DistrictAdditionalInfo } from './CreateDistrictFormPanel/CreateDistrictFormPanel.types';
import { DistrictColorsList } from './CreateDistrictBorderMapPage.constants';
import { HousingStockListResponse } from 'myApi';
import housingStockMiniPlacemark from './placemarks/housingStockMiniPlacemark.svg';

export const CreateDistrictBorderMapPage: FC<
  CreateDistrictBorderMapPageProps
> = ({
  isLoadingHousingStocks,
  housingStocksList,
  selectedByAddressHousingStockIds,
  selectedByAddressPoligon,
  poligonCenter,
  handleCloseDistrictEditer,
  handleCreateDistrict,
  isLoadingCreatingDistrict,
  existingDistricts,
}) => {
  const byAddressList = Boolean(selectedByAddressHousingStockIds.length);

  const mapRef = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState<ymaps.Map | null>(null);

  const [district, setDistrict] = useState<ymaps.Polygon | null>(null);
  const [housingStocksGroup, setHousingStocksGroup] =
    useState<ymaps.GeoObjectCollection | null>(null);

  const [miniHousingStocksGroup, setMiniHousingStocksGroup] =
    useState<ymaps.GeoObjectCollection | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [selectedHousingStocks, setSelectedHousingStocks] = useState<number[]>(
    [],
  );

  const [districtColor, setDistrictColor] = useState<DistrictColor>(
    DistrictColor.Blue,
  );

  const [districtName, setDistrictName] = useState('');

  const [formSection, setFormSection] = useState<number>(0);

  useEffect(() => {
    if (!byAddressList) return;
    if (!map) return;

    setSelectedHousingStocks(selectedByAddressHousingStockIds);
    afterMovingByAddress();
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

  const initMaps = useCallback(() => {
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

    const miniHousingStocksGroup = new ymaps.GeoObjectCollection();

    map.geoObjects.add(miniHousingStocksGroup);

    setMap(map);
    setHousingStocksGroup(housingStocksGroup);
    setMiniHousingStocksGroup(miniHousingStocksGroup);
  }, [poligonCenter]);

  useEffect(() => {
    if (!map || !existingDistricts.length) return;

    existingDistricts.forEach((elem) => {
      const districtAdditionalInfo = JSON.parse(
        elem.additionalInfo || '',
      ) as unknown as DistrictAdditionalInfo;

      const color = DistrictColorsList.find(
        (elem) => elem.type === districtAdditionalInfo.districtColor,
      );

      const polygon = new ymaps.Polygon(
        [districtAdditionalInfo.districtPolygonCoordinates] || [],
        {},
        {
          editorDrawingCursor: 'crosshair',
          fillColor: color?.color,
          strokeColor: color?.strokeColor,
          strokeWidth: 3,
        } as any,
      );

      map.geoObjects.add(polygon);
    });
  }, [map, existingDistricts]);

  useEffect(() => {
    ymaps.ready(initMaps);
  }, [mapRef, initMaps]);

  const afterMovingByAddress = useCallback(() => {
    if (!map) return;

    const polygonCoordinatesByAddress = [selectedByAddressPoligon];

    const { color, strokeColor } = getDistrictColorData(districtColor);

    const byAddressDistrict = new ymaps.Polygon(
      (Boolean(polygonCoordinatesByAddress[0].length) &&
        polygonCoordinatesByAddress) ||
        [],
      {},
      {
        editorDrawingCursor: 'crosshair',
        fillColor: color,
        strokeColor: strokeColor,
        strokeWidth: 3,
      } as any,
    );

    district && map.geoObjects.remove(district);

    map.geoObjects.add(byAddressDistrict);

    setDistrict(byAddressDistrict);
  }, [district, districtColor, map, selectedByAddressPoligon]);

  const startEditing = useCallback(() => {
    if (!map) return;

    const polygonCoordinates = district?.geometry?.getCoordinates();

    const { color, strokeColor } = getDistrictColorData(districtColor);

    const newDistrict = new ymaps.Polygon(polygonCoordinates || [], {}, {
      editorDrawingCursor: 'crosshair',
      fillColor: color,
      strokeColor: strokeColor,
      strokeWidth: 3,
    } as any);

    district && map.geoObjects.remove(district);

    map.geoObjects.add(newDistrict);

    (newDistrict.editor as any).startDrawing();

    setIsEditing(true);

    setDistrict(newDistrict);
  }, [district, districtColor, map]);

  const handleApplyDistrict = () => {
    if (!map || !district) return;

    const polygonCoordinates = district.geometry?.getCoordinates();

    if (!polygonCoordinates?.[0].length) {
      setIsEditing(false);
      return;
    }

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

  const { housingStocks, selected: housingStocksInDistrict } = useMemo(() => {
    const polygonCoordinates = district?.geometry?.getCoordinates();

    const filteredHousingStocks = housingStocksList.reduce(
      (acc, elem) => {
        const isInPolygon = isPointInsidePolygon(
          [elem.coordinates?.latitude || 0, elem.coordinates?.longitude || 0],
          polygonCoordinates?.[0] || [[0, 0]],
        );

        const key = isInPolygon ? 'selected' : 'housingStocks';

        return { ...acc, [key]: [...acc[key], elem] };
      },
      {
        selected: [] as HousingStockListResponse[],
        housingStocks: [] as HousingStockListResponse[],
      },
    );

    byAddressList
      ? setSelectedHousingStocks(selectedByAddressHousingStockIds)
      : setSelectedHousingStocks(
          filteredHousingStocks.selected.map((elem) => elem.id),
        );

    return filteredHousingStocks;
  }, [
    district,
    housingStocksList,
    byAddressList,
    selectedByAddressHousingStockIds,
  ]);

  useEffect(() => {
    if (!miniHousingStocksGroup) return;

    miniHousingStocksGroup.removeAll();

    const pointHousingStocksPlacemarks = housingStocks.map((elem) => {
      const placemark = new ymaps.Placemark(
        [elem.coordinates?.latitude, elem.coordinates?.longitude],
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: housingStockMiniPlacemark,
          iconImageSize: [26, 26],
        },
      );

      return placemark;
    });

    pointHousingStocksPlacemarks.forEach((elem) =>
      miniHousingStocksGroup.add(elem),
    );
  }, [miniHousingStocksGroup, housingStocks]);

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

    [...housingStockPlacemarks].forEach((elem) => {
      housingStocksGroup.add(elem);
    });
  }, [
    handleClickHousingStock,
    housingStocksGroup,
    housingStocksInDistrict,
    isEditing,
    selectedHousingStocks,
    housingStocks,
  ]);

  useEffect(() => {
    if (!district) return;

    const { color, strokeColor } = getDistrictColorData(districtColor);

    district.options.set('strokeColor', strokeColor);
    district.options.set('fillColor', color);
  }, [district, districtColor]);

  const districtPolygonCoordinates = useMemo(() => {
    return district?.geometry?.getCoordinates()?.[0] || [];
  }, [district]);

  return (
    <div>
      <Header>
        <div onClick={() => handleCloseDistrictEditer()}>
          <GoBack />
        </div>
        <ControlButtonsWrapper>
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
        </ControlButtonsWrapper>
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
            handleCreateDistrict={handleCreateDistrict}
            isLoadingCreatingDistrict={isLoadingCreatingDistrict}
            districtName={districtName}
            setDistrictName={setDistrictName}
            districtPolygonCoordinates={districtPolygonCoordinates}
          />
        )}
      </MapWrapper>
    </div>
  );
};
