import { InspectorResponse } from 'myApi';

export const sortInspectorsByAlphabet = (inspectors: InspectorResponse[]) => {
  const compareInspector = (x: InspectorResponse, y: InspectorResponse) =>
    x.fullName!.localeCompare(y.fullName!);

  return inspectors.sort(compareInspector);
};
