import React, { useContext } from 'react';
import { AddNodeContext } from '../AddNodeContext';
import { HeaderWrap, Title, Subtitle } from '../../../_components/Headers';
import { GoBack } from '../../../../ui-kit/shared_components/GoBack';

export const Header = () => {
  const { housingStock } = useContext(AddNodeContext);
  const { id, city, street, number, corpus } = housingStock;

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
            {`${city}, ${street}, ${number}${corpus ? `, к.${corpus}` : ''}`}
          </Subtitle>
        </div>
      </div>
    </HeaderWrap>
  );
};

export default Header;
