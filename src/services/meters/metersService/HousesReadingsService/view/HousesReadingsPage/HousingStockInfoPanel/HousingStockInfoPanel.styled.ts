import styled from 'styled-components';

export const Title = styled.div`
  color: #272f5a;
  font-weight: 500;
  font-size: 20px;
  margin-top: 24px;
`;

export const Panel = styled.div`
  background: rgba(24, 158, 233, 0.08);
  margin-top: 16px;
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-gap: 16px;
  border-radius: 4px;
`;

export const PanelInfoLabel = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: rgba(39, 47, 90, 0.7);
`;

export const PanelInfoText = styled.div`
  margin-top: 12px;
  font-weight: 500;
  font-size: 14px;
  color: #272f5a;
`;

export const StickyWrapper = styled.div`
  background-color: #fff;
  /* position: sticky; */
  top: 72px;
  z-index: 10;
`;
