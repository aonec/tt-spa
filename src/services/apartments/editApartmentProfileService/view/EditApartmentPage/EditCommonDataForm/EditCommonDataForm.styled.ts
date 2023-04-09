import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 580px;
`;

export const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const SaveButtonWrapper = styled.div`
  margin-left: 15px;
`;

export const SquareAddonWrapper = styled.div`
  font-size: 18px;
  color: #272f5ab2;
  font-weight: 400;

  sup {
    font-weight: 500;
    font-size: 11px;
  }
`;

export const FieldsWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px 15px;
`;
