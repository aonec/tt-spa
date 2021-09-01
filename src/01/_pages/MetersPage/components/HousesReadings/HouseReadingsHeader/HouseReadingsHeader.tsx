import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns:
    10px minmax(130px, 160px) 1px minmax(110px, 150px) minmax(140px, 180px)
    minmax(140px, 180px) 75px minmax(134px, 304px) 32px;

  column-gap: 16px;
  color: var(--main-90);
  background-color: var(--main-4);
  border-bottom: 1px solid var(--frame);
  align-items: center;
  padding: 16px;

  font-size: 12px;
`;

export const HouseReadingsHeader: React.FC = () => {
  return (
    <Container>
      <div>№ кв.</div>
      <div>ФИО собственника</div>
      <div></div>
      <div>Прибор</div>
      <div>Посл. показ.</div>
      <div>Тек. показ.</div>
      <div>Потребл.</div>
      <div>Комментарии</div>
      <div></div>
    </Container>
  );
};
