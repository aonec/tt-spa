import { getPreviousReadingsMonth } from '01/shared/lib/readings/getPreviousReadingsMonth';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Checkbox } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MonthWrapper } from './Header.styled';
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
      <Flex>
        <Title>Информация о приборе</Title>
        <Space />
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
      </Flex>
      <div>Статус</div>
      {slider}
      <MonthWrapper>{getPreviousReadingsMonth(-1)}</MonthWrapper>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: 375px 100px 145px 145px 2.2fr;
  grid-gap: 10px;
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
