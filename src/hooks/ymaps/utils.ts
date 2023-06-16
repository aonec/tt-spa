import { useEffect, useState } from 'react';
import { DistrictColorsList } from 'services/settings/districtBordersService/CreateDistrictBorderByMapService/view/CreateDistrictBorderMapPage/CreateDistrictBorderMapPage.constants';
import { DistrictData, ymaps } from 'types';
import { getTextPlacemarkCode } from './placemarks/textPlacemark';

export function useMapGroup(map: ymaps.Map | null) {
  const [group, setGroup] = useState<ymaps.GeoObjectCollection | null>(null);

  useEffect(() => {
    if (!map) return;

    const newGroup = new ymaps.GeoObjectCollection();

    map.geoObjects.add(newGroup);

    setGroup(newGroup);
  }, [map]);

  return group;
}

export function useRenderDistricts(
  map: ymaps.Map | null,
  districts: (DistrictData & { onClick?: (id: string) => void })[],
) {
  const districtsGroup = useMapGroup(map);

  useEffect(() => {
    if (!districtsGroup || !districts.length) return;

    districtsGroup.removeAll();

    districts.forEach((district) => {
      const color = DistrictColorsList.find(
        (elem) => elem.type === district.type,
      );

      const polygon = new ymaps.Polygon(district.coordinates || [], {}, {
        editorDrawingCursor: 'crosshair',
        fillColor: color?.color,
        strokeColor: color?.strokeColor,
        strokeWidth: 3,
        zIndex: 10,
      } as any);

      if (district.onClick) {
        polygon.events.add('click', () => district.onClick?.(district.id));
      }

      districtsGroup.add(polygon);

      return () => districtsGroup.removeAll();
    });
  }, [districtsGroup, districts]);
}

export function useRenderTextPlacemarks(
  map: ymaps.Map | null,
  texts: { text: string; coords: [number, number] }[],
) {
  const textGroup = useMapGroup(map);

  useEffect(() => {
    if (!textGroup) return;

    textGroup.removeAll();

    texts.forEach(({ text, coords }) => {
      const code = getTextPlacemarkCode(text);

      var polygonLayout = ymaps.templateLayoutFactory.createClass(code);

      const placemark = new ymaps.Placemark(
        coords,
        {},
        {
          iconLayout: polygonLayout,
        },
      );

      textGroup.add(placemark);
    });

    return () => void textGroup.removeAll();
  }, [textGroup, texts]);
}

export function useRenderPlacemarks(
  map: ymaps.Map | null,
  placemarks: {
    placemarkIconLink: string;
    coords: [number, number];
    onClick?: () => void;
  }[],
) {
  const placemarksGroup = useMapGroup(map);

  useEffect(() => {
    if (!placemarksGroup) return;

    placemarksGroup.removeAll();

    placemarks.forEach(({ placemarkIconLink, coords, onClick }) => {
      const placemark = new ymaps.Placemark(
        coords,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: placemarkIconLink,
          iconImageSize: [51, 51],
          zIndex: 100,
        },
      );

      if (onClick) placemark.events.add('click', onClick);

      placemarksGroup.add(placemark);
    });

    return () => void placemarksGroup.removeAll();
  }, [placemarks, placemarksGroup]);
}
