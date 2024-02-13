import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px 0px;
  margin: 8px 0px;

  box-shadow: 0px 8px 16px 0px rgba(78, 93, 146, 0.08),
    0px 4px 4px 0px rgba(78, 93, 146, 0.16);
`;

export const TitleWrapper = styled.div`
  color: #272f5ab2;
  font-weight: 500;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  font-size: 18px;
  color: #272f5ab2;
`;

export const SerialNumberWrapper = styled.div`
  color: #272f5a;
  font-weight: 500;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const MonthWrapper = styled.div`
  font-size: 16px;
  font-weight: 500;

  color: #272f5a;
  text-transform: capitalize;
`;

export const ReadingHistoryButtonWrapper = styled.div`
  margin-top: 50px;
  margin-left: 26px;
`;

export const DeviceInfoWrapper = styled.div`
  margin-top: 8px;
`;

export const RightBlock = styled.div`
  display: flex;
`;
