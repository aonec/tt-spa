import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  margin-top: 24px;

  .title {
    color: #272f5ab2;
  }
`;

export const HomeownerInfoWrapper = styled.div`
  color: #272f5a;
  font-weight: 500;
  width: 220px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AccountNumberWrapper = styled.div`
  margin-left: 16px;

  color: #272f5a;
  font-weight: 500;
  width: 220px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  .account-number-info {
    display: flex;
    align-items: center;
  }
`;

export const DateWrapper = styled.div`
  color: #272f5ae5;
  font-weight: 400;
`;

export const PaymentCodeWrapper = styled.div`
  color: #272f5a;
  font-weight: 500;
  width: 110px;
  margin-left: 16px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PhoneNumberWrapper = styled.div`
  color: #272f5a;
  font-weight: 500;
  width: 140px;
  margin-left: 16px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const AccountNumberTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoIconWrapper = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  &:hover {
    path {
      fill: #189ee9 !important;
    }
  }
  path {
    fill: #272f5a;
  }
`;
