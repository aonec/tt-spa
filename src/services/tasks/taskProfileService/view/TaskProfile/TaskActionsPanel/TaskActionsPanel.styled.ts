import styled from 'styled-components';

export const Wrapper = styled.div`
  min-width: 800px;
  margin-top: 15px;
  padding: 15px;
  box-shadow: 0px 4px 12px rgba(78, 93, 146, 0.2);
  border-radius: 6px;
`;

export const PushStageButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const HalfSizeActionsWrapper = styled.div<{ isOneElement?: boolean }>`
  display: grid;
  grid-template-columns: ${({ isOneElement }) =>
    isOneElement ? '1fr' : '1fr 1fr'};
  grid-column-gap: 15px;
`;

export const BottomContentWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
`;

export const BottomActionWrapper = styled.div`
  width: calc(100% - 185px);
`;

export const TaskActionInfoElementWrapper = styled.div`
  margin-bottom: 15px;
`;
