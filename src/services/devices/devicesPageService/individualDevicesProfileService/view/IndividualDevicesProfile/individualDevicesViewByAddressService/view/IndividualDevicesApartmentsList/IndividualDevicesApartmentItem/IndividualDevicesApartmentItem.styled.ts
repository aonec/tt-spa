import { ChevronDown } from 'react-bootstrap-icons';
import styled from 'styled-components';

export const Wrapper = styled.div<{ isApartmentOpen: boolean }>`
  height: 48px;
  transition: 0.2s;
  cursor: pointer;
  color: #272f5ae5;
  position: relative;

  padding: 0 10px;

  display: grid;
  grid-template-columns: 15px 0.2fr 2fr 0.25fr 30px;
  align-items: center;
  grid-gap: 15px;

  ${({ isApartmentOpen }) =>
    isApartmentOpen && 'box-shadow: 0px 6px 6px rgba(78, 93, 146, 0.16);'}

  &:hover {
    box-shadow: 0px 6px 6px rgba(78, 93, 146, 0.16);
  }
`;

export const ApartmentNumber = styled.div`
  color: #272f5a;
  font-weight: 500;
`;

export const PersonalAccountNumber = styled.div`
  color: rgba(39, 47, 90, 0.6);
  text-align: right;
  padding-right: 25px;
`;

export const Chevron = styled(ChevronDown)<{ open: boolean }>`
  transition: 0.2s;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : '')};
  cursor: pointer;
`;
