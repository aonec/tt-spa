import styled from 'styled-components';

export const PanelWrapper = styled.div`
  display: flex;
  width: 736px;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  box-shadow: 0px 4px 4px 0px rgba(78, 93, 146, 0.16),
    0px 8px 16px 0px rgba(78, 93, 146, 0.08);
`;

export const RightBlock = styled.div`
  color: rgba(39, 47, 90, 0.7);
  font-weight: 400;
  line-height: 32px;
`;

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #272f5a;
  font-weight: 500;
`;
