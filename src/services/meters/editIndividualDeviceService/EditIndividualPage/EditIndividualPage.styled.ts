import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div``;

export const LoaderWrapper = styled.div`
  width: 680px;
`;

export const PageTitle = styled.div`
  margin-top: 12px;
  margin-bottom: 6px;
`;

export const DeviceTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const DeviceModel = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;

export const DeviceNumber = styled.div`
  color: rgba(39, 47, 90, 0.8);
  font-weight: 00;
  font-size: 32px;
  line-height: 48px;
  margin-left: 8px;
  color: rgba(39, 47, 90, 0.6);
`;

export const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const Address = styled(Link)`
  font-weight: 500;
  color: #272f5a;
  opacity: 0.9;
`;

export const ResourceIconLookupWrapper = styled.div`
  transform: scale(1.3);
  margin: 0px 16px 0px 6px;
  display: flex;
  align-items: center;
`;
