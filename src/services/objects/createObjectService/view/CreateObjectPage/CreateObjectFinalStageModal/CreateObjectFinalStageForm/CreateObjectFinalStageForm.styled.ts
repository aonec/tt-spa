import styled from 'styled-components';

export const Wrapper = styled.div``;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-gap: 45px;
`;

export const GridContainerForAdditionalAddresses = styled.div`
  display: grid;
  grid-gap: 5px;
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

export const FieldForAdditionalAddresses = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #272f5acc;
  border-bottom: 2px solid #f3f3f3;
  display: flex;
  align-items: center;
  padding: 10px 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const SpacedIndex = styled.span`
  padding: 0px 10px;
`;

export const SpacesHouseNumber = styled.span`
  padding: 0px 4px;
`;
