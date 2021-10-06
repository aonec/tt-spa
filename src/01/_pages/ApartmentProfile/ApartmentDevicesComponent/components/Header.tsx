import { Checkbox } from 'antd';
import React from 'react';
import styled from 'styled-components';
interface HeaderInterface {
  slider: React.ReactElement;
  showClosed: boolean;
  setShowClosed(callback: (value: boolean) => void | boolean): void;
}

export function Header({ slider, showClosed, setShowClosed }: HeaderInterface) {
  return (
    <HeaderWrap>
      <Title>Информация о приборе</Title>
      <Checkbox
        checked={showClosed}
        onChange={() => setShowClosed((prev) => !prev)}
      >
        показать закрытые
      </Checkbox>
      <div>Статус</div>
      {slider}
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 2fr 4fr;
  background: rgba(39, 47, 90, 0.04);
  padding: 16px;
  align-items: center;
`;

const Title = styled.h5`
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.85);
`;

export default Header;
