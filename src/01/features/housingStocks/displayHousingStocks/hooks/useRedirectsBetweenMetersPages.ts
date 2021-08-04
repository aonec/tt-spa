import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { $housingStocks } from '../models';

export function useRedirectBetweenMetersPages() {
  const housingStocks = useStore($housingStocks);
  const history = useHistory();

  useEffect(() => {
    if (!housingStocks) return;

    if (housingStocks?.length === 1) {
      history.push(`/meters/houses/${housingStocks[0]?.id}`);
    } else {
      history.push('/meters/houses');
    }
  }, [housingStocks]);
}
