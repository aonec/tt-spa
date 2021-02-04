import React from 'react';
import { HeaderWrap, Title, Subtitle } from '01/_components';
import {Breadcrumb} from '../../../tt-components';

export const Header = (props) => {
  const { housingStock } = props;
  const {
    id, city, street, number, corpus,
  } = housingStock;

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
