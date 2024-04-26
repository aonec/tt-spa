export enum TabsSection {
  CommonData = 'CommonData',
  Homeowners = 'Homeowners',
  ActsJournal = 'ActsJournal',
}

export type PutApartment = {
  ApartmentId: number;
  Square?: number;
  NumberOfLiving?: number;
  NormativeNumberOfLiving?: number;
  MainHomeownerAccountId?: string;
  Comment?: string;
  ColdWaterRiserCount?: number;
  HotWaterRiserCount?: number;
};
