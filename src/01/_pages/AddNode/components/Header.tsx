import React, { useContext } from 'react';
import { AddNodeContext } from '../AddNodeContext';
import { HeaderWrap, Title, Subtitle } from '../../../_components/Headers';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';

export const Header = () => {
  const { housingStock } = useContext(AddNodeContext);
  const { id } = housingStock;

  return (
    <HeaderWrap
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <GoBack path={`/objects/${id}`} />
        <div>
          <Title>Добавление нового узла</Title>
          <Subtitle to={`/objects/${id}`}>
            {getHousingStockAddress(housingStock, true)}
          </Subtitle>
        </div>
      </div>
    </HeaderWrap>
  );
};

export default Header;
