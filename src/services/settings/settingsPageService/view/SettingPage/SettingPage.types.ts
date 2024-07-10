export type SettingPageProps = {
  handleReassingInspector: () => void;
  handleEditTemperatureNormative: (payload: boolean) => void;
  isAdminSettings: boolean;
  setModalOpen: (payload: boolean) => void;
};

export enum SettingsPageSection {
  operatingRanges = 'operatingRanges',
  temperatureGraph = 'temperatureGraph',
  districtBorder = 'districtBorder',
  controllers = 'controllers',
  inspectors = 'inspectors',
  mvitu = 'mvitu',
}
