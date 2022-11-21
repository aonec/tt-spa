import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Text } from './Text';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { PageHeader } from '01/shared/ui/PageHeader';
import { useHistory, useLocation } from 'react-router-dom';

export const Header = ({ apartment }) => {
  const history = useHistory();
  const location = useLocation();

  const handleEditApartment = useCallback(() => {
    const pathArray = location.pathname.split('/');

    pathArray.push('edit');

    const path = pathArray.join('/');

    history.push(path);
  }, [location.pathname, history]);

  return (
    <div>
      <PageHeader
        title={`Кв. №${apartment.apartmentNumber}`}
        contextMenu={{
          menuButtons: [
            {
              title: 'Редактировать квартиру',
              onClick: handleEditApartment,
            },
          ],
        }}
      />
      <Text>{getHousingStockAddress(apartment.housingStock, true)}</Text>
    </div>
  );
};

export default Header;
