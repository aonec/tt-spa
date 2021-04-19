import React, { useContext } from 'react';
// import { HeaderWrap, Title, Subtitle } from '01/_components';
import { AddNodeContext } from '../AddNodeContext';
import { Breadcrumb } from '../../../tt-components';
import { HeaderWrap, Title, Subtitle } from '../../../_components/Headers';

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
        <Breadcrumb path={`/objects/${id}`} />
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
