import styled from 'styled-components';
import { Checkbox } from 'antd';

export const deviceSealLineGridTemplate = '1fr 1fr';

export const Wrapper = styled.div`
  margin-top: 24px;
`;

export const Header = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: ${deviceSealLineGridTemplate};

  grid-gap: 16px;

  background: rgba(39, 47, 90, 0.04);
  height: 48px;
  padding: 0 16px;
  border-bottom: 1px solid #dcdee4;
  font-weight: 400;
  line-height: 16px;
  user-select: none;
`;

export const ColumnTextWrapper = styled.span`
  font-weight: 600;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxSC = styled(Checkbox)`
  margin-left: 16px;
`;
