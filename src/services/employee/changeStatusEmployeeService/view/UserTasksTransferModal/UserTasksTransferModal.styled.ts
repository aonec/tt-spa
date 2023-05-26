import styled from 'styled-components';
import { Select } from 'ui-kit/Select';
import { PointIcon } from 'ui-kit/icons';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectSC = styled(Select)`
  width: 260px;
`;

export const ContentWrapper = styled.div``;

export const SpaceLineWrapper = styled.div`
  transform: translateX(-32px);
  width: calc(100% + 64px);
`;

export const SearchWrapper = styled.div`
  margin-top: 24px;
`;

export const SelectRoleOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GreenPoint = styled(PointIcon)`
  transform: scale(1.2);

  path {
    fill: #17b45a !important;
  }
`;

export const GrayPoint = styled(PointIcon)`
  transform: scale(1.2);
`;
