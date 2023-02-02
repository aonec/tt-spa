import styled from 'styled-components';

export const Wrapper = styled.div``;

export const HeaderWrapper = styled.div`
  margin-top: 42px;
`;

export const ExtendedSearchWrapper = styled.div`
  margin-top: 42px;
`;

export const FiltrationInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FiltrationInfoList = styled.div`
  display: flex;
  gap: 8px;
  margin-right: 16px;
`;

export const FiltrationInfoItem = styled.div`
  background: rgba(24, 158, 233, 0.16);
  border-radius: 4px;
  height: 32px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  color: #272f5a;
  font-weight: 400;
  font-size: 16px;
  white-space: nowrap;
`;

export const HeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  svg {
    width: 26px;
    height: 26px;

    path {
      fill: #272f5a;
    }
  }
`;
