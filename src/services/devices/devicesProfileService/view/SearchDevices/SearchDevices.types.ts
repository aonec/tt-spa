import { CalculatorsListRequestPayload } from "01/features/carlculators/calculators/types";

export type SearchDevicesProps = {
  isExtendedSearchOpen: boolean
  fetchcalc: (payload: CalculatorsListRequestPayload) => CalculatorsListRequestPayload
  searchStateChanged: (payload: Partial<CalculatorsListRequestPayload>) => CalculatorsListRequestPayload
};