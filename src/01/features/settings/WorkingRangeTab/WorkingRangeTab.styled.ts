import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const Wrapper = styled.div``;

export const ChevronIconRight = styled(ChevronIcon)`
  transform: rotate(180deg);
  path {
    fill: #272f5a;
    fill-opacity: 1;
  }
`;

export const Panel = styled.div`
  padding-left: 32px;
  padding-right: 20px;
  margin-bottom: 16px;
  margin-left: 3px;

  max-width: 960px;
  height: 48px;
  background: #ffffff;
  border: 1px solid rgba(24, 158, 233, 0.16);
  border-radius: 4px;

  color: rgba(39, 47, 90, 0.9);
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: 0.2s;

  &:hover {
    font-weight: 600;
    border: 1px solid #189ee9;
    box-shadow: 0px 4px 4px 1px rgba(24, 158, 233, 0.16);
  }
`;
