import axios from '01/axios';
import React from 'react';
import { useEffect } from 'react';

export const ApartmentActsList = () => {
  async function fetchData() {
    try {
      const res = await axios.get('ApartmentActs');
      console.log(res);
    } catch (error) {}
  }

  useEffect(() => void fetchData(), []);

  return <></>;
};
