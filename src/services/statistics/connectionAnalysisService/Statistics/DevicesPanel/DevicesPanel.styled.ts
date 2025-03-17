import styled from 'styled-components';
import { DownloadIcon, LoadingBlueIcon } from 'ui-kit/icons';
import { Pagination } from 'ui-kit/Pagination';

export const Wrapper = styled.div`
  min-height: 64px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);

  margin-top: 5px;

  &:first-child {
    margin-top: 0;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  font-size: 14px;
  padding: 16px;
  color: #272f5ab2;
  font-weight: 500;

  cursor: pointer;
`;

export const Title = styled.div`
  font-weight: 500;
  color: rgba(39, 47, 90, 1);
  font-size: 16px;
`;

export const RighContentWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const DevicesAmount = styled.div`
  color: #272f5ab2;
  font-weight: 400;
  font-size: 16px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DownloadIconSC = styled(DownloadIcon)`
  margin-left: 6px;
  &:hover path {
    fill: rgba(24, 158, 233, 1);
    transition: 0.2s;
  }
`;

export const LoadingBlueIconSC = styled(LoadingBlueIcon)`
  margin-left: 2px;
`;

export const PaginationSC = styled(Pagination)`
  padding: 10px;
`;
