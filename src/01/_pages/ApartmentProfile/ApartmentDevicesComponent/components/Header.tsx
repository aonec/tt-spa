import { getPreviousMonthFromDate } from '01/utils/getMonthFromDate';
import { Checkbox } from 'antd';
import React from 'react';
import styled from 'styled-components';
interface HeaderInterface {
  slider: React.ReactElement;
  showClosed: boolean;
  setShowClosed(callback: (value: boolean) => void | boolean): void;
  devicesCount: number;
}

export function Header({
  slider,
  showClosed,
  setShowClosed,
  devicesCount,
}: HeaderInterface) {
  return (
    <HeaderWrap>
      <Title>Информация о приборе</Title>
      {devicesCount ? (
        <Checkbox
          checked={showClosed}
          onChange={() => setShowClosed((prev) => !prev)}
        >
          показать закрытые ({devicesCount})
        </Checkbox>
      ) : (
        <div></div>
      )}
      <div>Статус</div>
      {slider}
      <div style={{ paddingLeft: '90px' }}>{getPreviousMonthFromDate(1)}</div>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 2.7fr 1.9fr 2fr 2fr 2fr;
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
