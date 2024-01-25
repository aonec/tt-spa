export type SettingPageProps = {
  handleReassingInspector: () => void;
  handleEditTemperatureNormative: (payload: boolean) => void;
  isAdminSettings: boolean;
};

export enum SettingsPageSection {
  operatingRanges = 'operatingRanges',
  temperatureGraph = 'temperatureGraph',
  districtBorder = 'districtBorder',
  controllers = 'controllers',
  inspectors = 'inspectors',
}
