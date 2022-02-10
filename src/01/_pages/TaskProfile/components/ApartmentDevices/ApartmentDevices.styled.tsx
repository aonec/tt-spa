import { Flex } from '01/shared/ui/Layout/Flex';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrap = styled.div`
  margin-top: 25px;
  padding: 5px 0;
`;

export const Title = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ListWrap = styled.div`
  padding: 5px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
`;

export const DeviceWrap = styled.div`
  padding: 15px 15px;
  border-bottom: 1px solid #e8e8e8;

  &:last-child {
    border-bottom: none;
  }
`;

export const LinkToProfile = styled(Link)`
  color: black;
`;

export const OpenDeviceButton = styled(Flex)`
  cursor: pointer;
  transition: 0.2s;
  padding: 5px;
  border-radius: 20px;

  &:hover {
    background-color: #e1e1e1;
  }
`;

export const DeviceInfoRow = styled.div`
  font-size: 16px;
  padding: 15px 0;
  display: grid;
  grid-template-columns: 0.7fr 1fr;

  border-bottom: 1px solid #e8e8e8;

  &:last-child {
    border-bottom: none;
  }
`;
