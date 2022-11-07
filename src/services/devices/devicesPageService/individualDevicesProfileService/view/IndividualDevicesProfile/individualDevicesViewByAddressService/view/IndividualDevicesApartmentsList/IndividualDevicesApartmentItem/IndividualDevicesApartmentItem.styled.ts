import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 48px;
  border-radius: 4px;
  transition: 0.2s;
  cursor: pointer;

  padding: 0 10px;

  display: grid;
  grid-template-columns: 0.2fr 2fr 0.25fr 30px;
  align-items: center;
  grid-gap: 15px;

  &:hover {
    box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
      0px 8px 16px rgba(78, 93, 146, 0.08);
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
