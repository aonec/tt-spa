import { Breadcrumb, HeaderWrap } from '01/tt-components';
import { Title } from '01/_components/Headers';
import React from 'react';

export const AddIndividualDevice = () => {
  return (
    <HeaderWrap
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Breadcrumb />
        <div>
          <Title>Добавление нового узла</Title>
        </div>
      </div>
    </HeaderWrap>
  );
};
