import { useEffect } from 'react';
import { DistrictColorsList } from 'services/settings/districtBordersService/CreateDistrictBorderByMapService/view/CreateDistrictBorderMapPage/CreateDistrictBorderMapPage.constants';
import { DistrictData, ymaps } from 'types';

export function useRenderDistricts(
  group: ymaps.GeoObjectCollection | null,
  districts: (DistrictData & { onClick?: (id: string) => void })[],
) {
  useEffect(() => {
    if (!group || !districts.length) return;

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

      group.add(polygon);
    });
  }, [group, districts]);
}
