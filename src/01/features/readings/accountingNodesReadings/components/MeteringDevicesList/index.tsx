import { Grid } from '01/shared/ui/Layout/Grid';
import React from 'react';
import styled from 'styled-components';

export const MeteringDevicesList = () => {
  const header = (
    <Header temp={gridTemp}>
      <HeaderTitleElem></HeaderTitleElem>
    </Header>
  );

  return <>{header}</>;
};

const gridTemp = '1fr 0.75fr 0.75fr 0.75fr 0.75fr 0.75fr 20px';

const HeaderTitleElem = styled.div``;

const Header = styled(Grid)`
  background: rgba(39, 47, 90, 0.04);
`;
