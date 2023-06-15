import { useCallback, useEffect, useRef, useState } from 'react';
import { ymaps } from 'types';

export function useYMaps(callback: (map: ymaps.Map) => void) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState<ymaps.Map | null>(null);

  const initMaps = useCallback(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [55.6366, 51.8245],
      zoom: 15,
      controls: [],
    });

    callback(map);

    setMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ymaps.ready(initMaps);
  }, [initMaps, mapRef]);

  return { mapRef, map };
}
