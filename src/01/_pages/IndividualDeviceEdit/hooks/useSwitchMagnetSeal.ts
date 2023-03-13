import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { IndividualDeviceResponse } from 'myApi';
import axios from '01/axios';

export interface MagnetSeal {
  magneticSealInstallationDate: string | null;
  magneticSealTypeName: string | null;
  isInstalled: boolean;
}

export function useSwitchMagnetSeal(device: IndividualDeviceResponse) {
  const getMagnetSeal = useMemo(
    () => ({
      magneticSealInstallationDate: device.magneticSealInstallationDate,
      magneticSealTypeName: device.magneticSealTypeName,
      isInstalled: device.hasMagneticSeal,
    }),
    [device],
  );

  const [magnetSeal, setMagnetSeal] = useState<MagnetSeal>(getMagnetSeal);

  useEffect(() => setMagnetSeal(getMagnetSeal), [getMagnetSeal]);

  const getOnChange =
    <T>(
      name:
        | 'magneticSealInstallationDate'
        | 'magneticSealTypeName'
        | 'isInstalled',
    ) =>
    (value: T) =>
      setMagnetSeal((prev) => ({ ...prev, [name]: value }));

  async function saveMagnetSeal() {
    try {
      await axios.post(
        `IndividualDevices/${device.id}/SetMagneticSeal`,
        magnetSeal,
      );
    } catch (e) {}
  }

  return {
    magnetSeal,
    onChange: {
      magneticSealInstallationDate: getOnChange<string>(
        'magneticSealInstallationDate',
      ),
      magneticSealTypeName: getOnChange<string>('magneticSealTypeName'),
      isInstalled: getOnChange<boolean>('isInstalled'),
    },
    computedValues: {
      magneticSealInstallationDate: magnetSeal.magneticSealInstallationDate
        ? moment(magnetSeal.magneticSealInstallationDate)
        : null,
    },
    saveMagnetSeal,
  };
}
