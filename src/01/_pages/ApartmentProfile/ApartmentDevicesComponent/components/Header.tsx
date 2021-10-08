import { getPreviousReadingsMonth } from '01/shared/lib/readings/getPreviousReadingsMonth';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
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
      <div style={{ paddingLeft: '90px' }}>{getPreviousReadingsMonth(-1)}</div>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 0.6fr 1fr 1fr 2.2fr;
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
