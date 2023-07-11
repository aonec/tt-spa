import { useEffect, useMemo, useState } from 'react';
import { DistrictData, ymaps } from 'types';
import { getTextPlacemarkCode } from './placemarks/textPlacemark';
import { getCountPlacemarkCode } from './placemarks/countPlacemark';
import { findPolygonCenter } from 'utils/findPolygonCenter';
import { DistrictColorsList } from 'dictionaries';

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

      const polygonLayout = ymaps.templateLayoutFactory.createClass(code);

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

export function useRenderDistricts(
  map: ymaps.Map | null,
  districts: (DistrictData & { onClick?: (id: string) => void })[],
) {
  const districtsGroup = useMapGroup(map);
  const [savedDistricts, setSavedDistricts] = useState<{
    [key: string]: ymaps.Polygon;
  }>({});

  const districtTitles = useMemo(() => {
    return Object.entries(savedDistricts)
      .map(([id, elem]) => {
        const name = districts.find((elem) => elem.id === id)?.name;
        return {
          text: name,
          coords: findPolygonCenter(elem.geometry?.getCoordinates()?.[0] || []),
        };
      })
      .filter((elem) => Boolean(elem.text));
  }, [savedDistricts, districts]);

  useRenderTextPlacemarks(
    map,
    districtTitles as { text: string; coords: [number, number] }[],
  );

  useEffect(() => {
    if (!districtsGroup || !districts.length) return;

    districtsGroup.removeAll();

    const districtPolygons = districts.reduce((acc, district) => {
      const color = DistrictColorsList.find(
        (elem) => elem.type === district.type,
      );

      const savedDistrict = savedDistricts[district.id];

      const coordinates = savedDistrict?.geometry?.getCoordinates();

      const polygon = new ymaps.Polygon(
        coordinates || district.coordinates || [],
        {},
        {
          editorDrawingCursor: 'crosshair',
          fillColor: color?.color,
          strokeColor: color?.strokeColor,
          strokeWidth: 3,
          zIndex: 10,
        } as any,
      );

      if (district.onClick) {
        polygon.events.add('click', () => district.onClick?.(district.id));
      }

      districtsGroup.add(polygon);

      setSavedDistricts((prev) => ({ ...prev, [district.id]: polygon }));

      if (district.isEditing)
        (
          polygon.editor as unknown as { startDrawing: () => void }
        ).startDrawing();

      return { ...acc, [district.id]: polygon };
    }, {});

    setSavedDistricts(districtPolygons);

    return () => {
      districtsGroup.removeAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtsGroup, districts]);

  return { savedDistricts };
}

export function useRenderPlacemarks(
  map: ymaps.Map | null,
  placemarks: {
    placemarkIconLink: string;
    coords: [number, number];
    onClick?: () => void;
    count?: number;
    size?: number[];
  }[],
) {
  const placemarksGroup = useMapGroup(map);

  useEffect(() => {
    if (!placemarksGroup) return;

    placemarksGroup.removeAll();

    placemarks.forEach(
      ({ placemarkIconLink, coords, onClick, count, size }) => {
        const placemark = new ymaps.Placemark(
          coords,
          {},
          {
            iconLayout: 'default#image',
            iconImageHref: placemarkIconLink,
            iconImageSize: size || [51, 51],
            zIndex: 100,
            zIndexHover: 100,
          },
        );

        if (onClick) placemark.events.add('click', onClick);

        placemarksGroup.add(placemark);

        if (count) {
          const code = getCountPlacemarkCode(count);

          const polygonLayout = ymaps.templateLayoutFactory.createClass(code);

          const countPlacemark = new ymaps.Placemark(
            coords,
            {},
            {
              iconLayout: polygonLayout,
              zIndex: 100,
            },
          );

          placemarksGroup.add(countPlacemark);
        }
      },
    );

    return () => void placemarksGroup.removeAll();
  }, [placemarks, placemarksGroup]);
}
