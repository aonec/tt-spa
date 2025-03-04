import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ResourceWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ApartmentNumber = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #272f5a;
  margin-bottom: 4px;
`;

export const LinkSc = styled(Link)`
  font-weight: 700;
  font-size: 14px;
  color: #272f5a;
  margin-bottom: 4px;
  margin-right: 6px;
`;

export const PhoneNumber = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ClosingDate = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: rgba(39, 47, 90, 0.7);
`;

export const FullAddressWrapper = styled.div`
  max-width: 230px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ReadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReadingValue = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 16px;
  align-items: center;
`;

export const ReadingDate = styled.div`
  font-size: 12px;
  color: rgba(39, 47, 90, 0.7);
`;
