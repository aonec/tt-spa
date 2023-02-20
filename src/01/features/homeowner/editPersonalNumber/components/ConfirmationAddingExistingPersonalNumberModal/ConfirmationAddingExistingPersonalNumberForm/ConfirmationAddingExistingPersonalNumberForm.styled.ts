import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkSC = styled(Link)`
  color: #272f5a;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
`;

export const AddressWrapper = styled.span`
  margin-left: 8px;
  &:last-child {
    margin-left: 16px;
  }
`;

export const TitleWrapper = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
`;
