import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Text } from './Text';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { PageHeader } from '01/shared/ui/PageHeader';
import { useHistory, useParams } from 'react-router-dom';

export const Header = ({ apartment }) => {
  const history = useHistory();
  const { apartmentId } = useParams();

  return (
    <div>
      <PageHeader
        title={`Кв. №${apartment.apartmentNumber}`}
        contextMenu={{
          menuButtons: [
            {
              title: 'Редактировать квартиру',
              onClick: () => history.push(`/apartment/${apartmentId}/edit`),
            },
          ],
        }}
      />
      <Text>{getHousingStockAddress(apartment.housingStock, true)}</Text>
    </div>
  );
};

export default Header;
