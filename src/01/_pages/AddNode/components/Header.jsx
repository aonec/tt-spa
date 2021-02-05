import React, {useContext} from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import { Breadcrumb } from '../../../tt-components';
import {AddNodeContext} from "../index";

export const Header = () => {
  const { housingStock } = useContext(AddNodeContext);
  const { id, city, street, number, corpus } = housingStock;

  return (
    <HeaderWrap style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <div>
        <Breadcrumb path={`/objects/${id}`}>Назад</Breadcrumb>
        <div>
          <Title>Добавление нового узла</Title>
          <Subtitle
            to={`/objects/${id}`}
          >
            {`${city}, ${street}, ${number}${corpus ? `, к.${corpus}` : ''}`}
          </Subtitle>
        </div>
      </div>
    </HeaderWrap>
  );
};

export default Header;
