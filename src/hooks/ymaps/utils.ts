import { useEffect, useState } from 'react';
import { DistrictColorsList } from 'services/settings/districtBordersService/CreateDistrictBorderByMapService/view/CreateDistrictBorderMapPage/CreateDistrictBorderMapPage.constants';
import { DistrictData, ymaps } from 'types';

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
      } as any);

      if (district.onClick) {
        polygon.events.add('click', () => district.onClick?.(district.id));
      }

      districtsGroup.add(polygon);
    });
  }, [districtsGroup, districts]);
}

// export function useRenderTextPlacemarks(
//   group: ymaps.GeoObjectCollection | null,
//   text: string,
//   coords: [number, number],
// ) {
//   group.
// }
