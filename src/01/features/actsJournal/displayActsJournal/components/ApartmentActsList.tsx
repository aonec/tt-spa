import { Icon } from '01/shared/ui/Icon';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { useStore } from 'effector-react';
import moment from 'moment';
import { ApartmentActResponse, EActResourceType } from 'myApi';
import React from 'react';
import styled from 'styled-components';
import { $actResources } from '../../displayActResources/models';
import { $actTypes } from '../../displayActTypes/models';
import {
  $actJournalPageNumber,
  $apartmentActs,
  $apartmentActsPaged,
  ActJournalGate,
  expandedFilterForm,
  fetchApartmentActsFx,
  searchForm,
  setActJournalPageNumber,
} from '../models';
import { DocDate } from './AddNewActForm';
import { gridTemp } from './TableHeader';
import { ReactComponent as AllResourceIcon } from '../assets/allResourcesIcon.svg';
import { Empty, Pagination } from 'antd';
import { useForm } from 'effector-forms/dist';

const pageSize = 50;

export const ApartmentActsList = () => {
  const pending = useStore(fetchApartmentActsFx.pending);
  const {
    fields: { allowedActResources, allowedActTypes },
  } = useForm(expandedFilterForm);

  const pageNumber = useStore($actJournalPageNumber);

  const actsPagedData = useStore($apartmentActsPaged);

  const acts = useStore($apartmentActs);
  const actTypes = useStore($actTypes);
  const actResources = useStore($actResources);

  const { fields } = useForm(searchForm);

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
      <ActJournalGate
        ActTypes={allowedActTypes.value}
        ActResourceTypes={allowedActResources.value}
        PageNumber={pageNumber}
        PageSize={pageSize}
        ActDateOrderBy={fields.ActDateOrderBy.value}
        ActJobDateOrderBy={fields.ActJobDateOrderBy.value}
        RegistryNumberOrderBy={fields.RegistryNumberOrderBy.value}
        AddressOrderBy={fields.AddressOrderBy.value}
      />
      <PendingLoader loading={pending} skeleton>
        {acts?.length === 0 && (
          <Flex style={{ justifyContent: 'center' }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет актов"
            />
          </Flex>
        )}

        <div>{acts?.map(renderAct)}</div>
      </PendingLoader>
      <SpaceLine />
      {actsPagedData && (
        <Pagination
          showQuickJumper
          showSizeChanger={false}
          current={pageNumber}
          total={actsPagedData.totalItems}
          pageSize={pageSize}
          onChange={(value) => setActJournalPageNumber(value)}
        />
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-top: -12px;
`;

const ActWrap = styled(Grid)`
  height: 50px;
  align-items: center;
  padding: 0 0 0 15px;
  border-bottom: 1px solid #f3f3f3;

  &:last-child {
    border-bottom: none;
  }
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
