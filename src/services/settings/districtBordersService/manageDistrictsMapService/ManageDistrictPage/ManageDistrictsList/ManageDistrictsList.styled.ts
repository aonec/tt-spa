import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DistrictListItem = styled.div`
  box-shadow: 0px 8px 16px 0px rgba(78, 93, 146, 0.08),
    0px 4px 4px 0px rgba(78, 93, 146, 0.16);
`;

export const DistrictListItemHeader = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const DistrictAddressesList = styled.div`
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 32px;
`;

export const DistrictListItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  color: rgba(39, 47, 90, 0.9);
  font-size: 16px;
  font-weight: 400;
`;

export const ColorCircle = styled.div<{
  fillColor: string;
  strokeColor: string;
}>`
  width: 16px;
  height: 16px;
  border-radius: 9px;
  background: ${({ strokeColor }) => strokeColor};
  outline: 3px solid ${({ fillColor }) => fillColor};
`;

export const AddressWrapper = styled.div`
  transition: 0.2s;
  outline-color: #e5e7ed42;
  cursor: pointer;
  border-radius: 4px;
  outline-width: thick;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #e5e7ed42;
    outline: thick solid #e5e7ed42;
  }
`;

export const AddressHousesCount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(39, 47, 90, 0.7);
`;

export const StreetWrapper = styled.div<{ isOpen: boolean }>`
  color: var(--text-body, rgba(39, 47, 90, 0.9));
  font-size: 16px;
  font-weight: ${({ isOpen }) => (isOpen ? 500 : 400)};
`;

export const AddressNumbersList = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(66px, 68px));
  cursor: pointer;
`;

export const AddressNumber = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  height: 33px;
  border-radius: 4px;
  border: 1px solid #f3f5f6;
  background: ${({ isOpen }) => (isOpen ? '#189ee9' : '#ffffff')};
  color: ${({ isOpen }) => (isOpen ? 'white' : 'initial')};
  box-shadow: 0px 8px 16px 0px rgba(78, 93, 146, 0.08),
    0px 4px 4px 0px rgba(78, 93, 146, 0.16);
`;

export const Line = styled.div`
  border-bottom: 1px solid #f2f3f6;
`;
