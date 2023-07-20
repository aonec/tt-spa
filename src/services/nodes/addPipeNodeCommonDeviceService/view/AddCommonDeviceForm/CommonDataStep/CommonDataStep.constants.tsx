import { EHousingMeteringDeviceType } from 'api/myApi';
import * as Yup from 'yup';

export const HousingMeteringDeviceDictionary: {
  [key in EHousingMeteringDeviceType]: string;
} = {
  [EHousingMeteringDeviceType.Counter]: 'Вычислитель',
  [EHousingMeteringDeviceType.FlowMeter]: 'Расходомер',
  [EHousingMeteringDeviceType.TemperatureSensor]: 'Термодатчик',
  [EHousingMeteringDeviceType.WeatherController]: 'Погода',
  [EHousingMeteringDeviceType.PressureMeter]: 'Давление',
};

export const validationSchema = Yup.object().shape({
  housingMeteringDeviceType: Yup.string()
    .nullable()
    .required('Это поле обязательное'),
});
