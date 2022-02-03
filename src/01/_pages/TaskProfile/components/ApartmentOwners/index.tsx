import React, { FC } from 'react';
import { HomeownerAccountListResponse } from 'myApi';
import styled from 'styled-components';
import { Flex } from '01/shared/ui/Layout/Flex';
import { ReactComponent as KeysIcon } from './assets/keys.svg';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Empty } from 'antd';
import { InfoSectionTitle } from '01/shared/ui/InfoSection';

interface Props {
  homeowners?: HomeownerAccountListResponse[];
}

export const ApartmentOwners: FC<Props> = ({ homeowners }) => {
  console.log(homeowners);
  return (
    <Wrap>
      <Flex>
        <KeysIcon />
        <Space w={8} />
        <Title>Собственники</Title>
      </Flex>
      <Space />
      <ListWrap>
        {!homeowners?.length ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          homeowners?.map((elem) => <Homeowner homeowner={elem} />)
        )}
      </ListWrap>
    </Wrap>
  );
};

const Homeowner = ({
  homeowner,
}: {
  homeowner: HomeownerAccountListResponse;
}) => {
  return (
    <HomeownerWrap>
      <HomeownerName>{homeowner.name}</HomeownerName>
      <HomeownerPhoneNumber>{homeowner.phoneNumber}</HomeownerPhoneNumber>
    </HomeownerWrap>
  );
};

const Wrap = styled.div`
  margin-top: 25px;
`;

const Title = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ListWrap = styled.div`
  padding: 5px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
`;

const HomeownerName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;

const HomeownerWrap = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  padding: 15px 10px;
  border-bottom: 1px solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }
`;

const HomeownerPhoneNumber = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;
