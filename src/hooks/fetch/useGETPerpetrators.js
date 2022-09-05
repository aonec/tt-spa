/* eslint-disable */

import { useEffect, useState } from 'react';
import { request } from 'services/api';

export const useGETPerpetrators = (start = true) => {
  const [perpetrators, setData] = useState(null);
  useEffect(() => {
    request('OrganizationUsers').then(({ items }) => setData(items));
  }, []);

  return perpetrators;
};
