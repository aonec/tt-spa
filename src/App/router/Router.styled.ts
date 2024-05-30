import { Drawer } from 'antd';
import styled from 'styled-components';

export const Layout = styled.div<{ isMenuOpen: boolean }>`
  height: 100vh;
  display: grid;
  grid-template-columns: ${({ isMenuOpen }) => (isMenuOpen ? '208px' : '48px')} 1fr;
`;

export const PageWrapper = styled.div`
  padding: 16px 52px;
`;

export const DrawerSC = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
`;
