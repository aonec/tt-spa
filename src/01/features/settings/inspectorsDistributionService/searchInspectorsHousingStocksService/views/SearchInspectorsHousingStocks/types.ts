export type SearchInspectorsHousingStocksProps = {
  form: any;
  cities: string[] | null;
  existingStreets: string[] | null;
  isExtendedSearchOpen: boolean;
  handelExtendedSearchOpen: () => void;
  handleExtendedSearchClose: () => void;
};
