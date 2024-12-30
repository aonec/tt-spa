import styled from 'styled-components';
import { RangePicker } from 'ui-kit/RangePicker';

export const PageWrapper = styled.div`
  width: 680px;
  color: rgba(39, 47, 90, 1);
`;

export const PageTitle = styled.div`
  font-size: 24px;
  margin: 6px 0px 20px 10px;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 2fr;
  margin-bottom: 20px;
  margin-top: 5px;
  padding: 20px 20px 10px 20px;
  min-height: 64px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);

  gap: 6px;
`;

export const RightBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReportName = styled.div`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const PeriodWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const RangePickerSC = styled(RangePicker)`
  width: 220px;
`;

export const Resource = styled.span`
  border-radius: 4px;
  background: rgba(24, 158, 233, 0.16);
  padding: 6px 10px;
  margin-right: 10px;
  font-weight: 500;
`;

export const Name = styled.div``;

export const NamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
