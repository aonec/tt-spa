import { Icon } from '01/shared/ui/Icon';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { useStore } from 'effector-react';
import moment from 'moment';
import { ApartmentActResponse, EActResourceType } from 'myApi';
import React from 'react';
import styled from 'styled-components';
import { $actResources } from '../../displayActResources/models';
import { $actTypes } from '../../displayActTypes/models';
import { $apartmentActs, fetchApartmentActsFx } from '../models';
import { DocDate } from './AddNewActForm';
import { gridTemp } from './TableHeader';
import { ReactComponent as AllResourceIcon } from '../assets/allResourcesIcon.svg';

export const ApartmentActsList = () => {
  const pending = useStore(fetchApartmentActsFx.pending);

  const acts = useStore($apartmentActs);
  const actTypes = useStore($actTypes);
  const actResources = useStore($actResources);

  const renderAct = (act: ApartmentActResponse) => {
    const actType = actTypes?.find((elem) => elem.key === act.actType)?.value;
    const resourceIcon = getIconFromResource(act.actResourceType);
    const resourceName = actResources?.find(
      (elem) => elem.key === act.actResourceType
    )?.value;
    const actAddress =
      act.apartment &&
      `ул. ${act.apartment.street} ${
        act.apartment.housingStockNumber + (act.apartment.corpus || '')
      }, кв. ${act.apartment.apartmentNumber}`;

    return (
      <ActWrap temp={gridTemp} key={act.id} gap="15px">
        <DocDate>{moment(act.actDateTime).format('DD.MM.YYYY')}</DocDate>
        <div>{act.registryNumber}</div>
        <div>{actType}</div>
        <Flex>
          {resourceIcon}
          <Space />
          {resourceName === 'Электроэнергия' ? 'ЭЭ' : resourceName}
        </Flex>
        <div>{actAddress}</div>
        <div>{moment(act.actJobDate).format('DD.MM.YYYY')}</div>
      </ActWrap>
    );
  };

  return (
    <Wrap>
      <PendingLoader loading={pending}>
        {acts?.length === 0 && 'Нет актов'}

        {acts?.map(renderAct)}
      </PendingLoader>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-top: -12px;
`;

const ActWrap = styled(Grid)`
  height: 50px;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #f3f3f3;
`;

export function getIconFromResource(resource: EActResourceType) {
  const icons = {
    [EActResourceType.All]: <AllResourceIcon />,
    [EActResourceType.ColdWaterSupply]: (
      <Icon name={EActResourceType.ColdWaterSupply} />
    ),
    [EActResourceType.HotWaterSupply]: (
      <Icon name={EActResourceType.HotWaterSupply} />
    ),
    [EActResourceType.Electricity]: (
      <Icon name={EActResourceType.Electricity} />
    ),
  };

  return icons[resource];
}
