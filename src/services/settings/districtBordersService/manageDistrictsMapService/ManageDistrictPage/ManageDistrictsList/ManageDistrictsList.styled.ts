import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DistrictListItem = styled.div`
  padding: 16px;
  box-shadow: 0px 8px 16px 0px rgba(78, 93, 146, 0.08),
    0px 4px 4px 0px rgba(78, 93, 146, 0.16);
`;

export const DistrictListItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
