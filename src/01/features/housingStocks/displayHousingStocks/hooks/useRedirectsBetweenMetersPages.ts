import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { $housingStocks } from '../models';
import { toArray } from '01/features/individualDevices/addIndividualDevice/components/CheckFormValuesModal';

export function useRedirectBetweenMetersPages(values: {
  [key: string]: string;
}) {
  const housingStocks = useStore($housingStocks);
  const history = useHistory();

  useEffect(() => {
    if (!housingStocks) return;
    if (!toArray(values, false).some(Boolean)) return;

    if (housingStocks?.length === 1) {
      history.push(`/meters/houses/${housingStocks[0]?.id}`);
    } else {
      history.push('/meters/houses');
    }
  }, [housingStocks]);
}
