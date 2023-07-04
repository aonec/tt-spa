import { EResourceType } from 'myApi';

export function getBitDepthAndScaleFactor(resource: EResourceType): {
  bitDepth: number;
  scaleFactor: number;
} {
  switch (resource) {
    case EResourceType.Electricity:
      return {
        bitDepth: 6,
        scaleFactor: 1,
      };

    default:
      return {
        bitDepth: 5,
        scaleFactor: 1,
      };
  }
}
