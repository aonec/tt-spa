import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import { PageHeader } from 'ui-kit/shared/PageHeader';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
`;

export const ExtendedSearchWrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
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
  color: #272f5a;
  font-weight: 400;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  line-height: 32px;
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

export const ButtonSC = styled(Button)`
  padding: 0 34px;
`;

export const PageHaderSC = styled(PageHeader)`
  margin-top: 16px;
`;
