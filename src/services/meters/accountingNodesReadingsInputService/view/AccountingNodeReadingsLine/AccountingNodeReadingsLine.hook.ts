import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'api/myApi';
import { useMemo } from 'react';
import {
  getPreparedNodeReadingsDictionary,
  getPreviousExistingReading,
} from '../../accountingNodesReadingsInputService.utils';

export function useNodeReadings(
  nodeReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[],
  sliderIndex: number,
) {
  const preparedReadings = useMemo(
    () => getPreparedNodeReadingsDictionary(nodeReadings),
    [nodeReadings],
  );

  const readings = useMemo(() => {
    const previousReadingReadingBySliderIndex:
      | HousingMeteringDeviceReadingsIncludingPlacementResponse
      | undefined = preparedReadings?.[sliderIndex];
    const currentReading:
      | HousingMeteringDeviceReadingsIncludingPlacementResponse
      | undefined = preparedReadings?.[-1];
    const previousExistingReadingBySliderIndex = getPreviousExistingReading(
      preparedReadings,
      sliderIndex,
    );
    const previousExistingReading = getPreviousExistingReading(
      preparedReadings,
      -1,
    );

    return {
      previousReadingReadingBySliderIndex,
      previousExistingReadingBySliderIndex,
      previousExistingReading,
      currentReading,
    };
  }, [sliderIndex, preparedReadings]);

  return readings;
}
