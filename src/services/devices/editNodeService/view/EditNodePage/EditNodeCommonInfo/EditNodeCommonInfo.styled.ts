import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 480px;

  .resource {
    width: 100%;
  }
`;

export const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 16px;
`;

export const AddZoneText = styled.div`
  display: flex;
  align-items: center;
  color: rgb(24, 158, 233);
  height: 48px;
  margin-left: 16px;
  cursor: pointer;
  font-weight: 500;
`;

export const ResourceText = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: centerF;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
`;
