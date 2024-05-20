import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 64px;
  width: 100%;
  max-width: 632px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 8px 16px 0px #4e5d9214;
  box-shadow: 0px 4px 4px 0px #4e5d9229;
`;

export const Title = styled.div`
  color: #272f5a;
  font-size: 16px;
  font-weight: 500;
`;

export const PanelContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ConnectedBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #17b45a;
`;

export const ConfirmFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  align-items: center;
  gap: 16px;
`;
