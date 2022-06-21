import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';

export const mapDeviceSearchStateToDownloadQuery = (
  searchState: Partial<CalculatorsListRequestPayload>
): CalculatorsListRequestPayload => {
  const filter = searchState['Filter.Address.Corpus']

  const formDiameterParams = (diameters: [number, number] | undefined) => {
    if (!diameters || (diameters[0] === 0 && diameters[1] === 255)) return {};
    return {
      'Filter.DiameterRange.From': diameters[0],
      'Filter.DiameterRange.To': diameters[1],
    };
  };

  return {
    // ...(searchTerm ? { Question: searchTerm } : {}),
    // ...(expirationDate
    //   ? { 'Filter.ExpiresCheckingDateAt': expirationDate }
    //   : {}),
    // ...formDiameterParams(diameterRange),
    // ...(destination ? { OrderBy: destination } : {}),
    // ...(rule ? { OrderRule: rule } : {}),
  };
};
