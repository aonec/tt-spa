import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin-top: 16px;
  border: 1px solid #dcdee4;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

export const MapPanel = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 352px;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
`;

export const MapPanelHeader = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Address = styled(Link)`
  font-weight: 600;
  color: rgba(39, 47, 90, 0.9);
  font-size: 16;
`;

export const City = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 12px;
  color: rgba(39, 47, 90, 0.6);
`;

export const PanelContent = styled.div`
  padding: 0 16px 16px 16px;
`;

export const FooterWrapper = styled.div`
  background: #f3f5f6;
  border-radius: 0 0 4px 4px;
  padding: 16px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;
