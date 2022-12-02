import styled from 'styled-components';

export const Wrapper = styled.div``;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-gap: 45px;
`;

export const PageTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin-bottom: 40px;
  margin-top: 40px;
  :first-child {
    margin-top: 0px;
  }
`;

export const FieldDescrition = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #272f5ab2;
`;
export const Field = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #272f5a;
`;
