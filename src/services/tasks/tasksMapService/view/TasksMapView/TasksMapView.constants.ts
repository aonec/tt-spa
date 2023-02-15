import { EActResourceType, EResourceType } from 'myApi';
import coldWaterSupplyPlacemark from './assets/coldWaterSupplyPlacemark.svg';
import electricityPlacemark from './assets/electricityPlacemark.svg';
import heatPlacemark from './assets/heatPlacemark.svg';
import hotWaterSupplyPlacemark from './assets/hotWaterSupplyPlacemark.svg';

export const ResourcesPlacemarksLookup: {
  [key in EResourceType | EActResourceType]: string;
} = {
  [EActResourceType.All]: '',
  [EResourceType.ColdWaterSupply]: coldWaterSupplyPlacemark,
  [EResourceType.Electricity]: electricityPlacemark,
  [EResourceType.Heat]: heatPlacemark,
  [EResourceType.HotWaterSupply]: hotWaterSupplyPlacemark,
};
