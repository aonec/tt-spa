import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import getAccessesList from '../../../_api/utils/getAccessesList';
import { IconTT, MenuButtonTT } from '../../../tt-components';
import { CalculatorResponse } from '../../../../myApi';
import { Loader } from '../../../components';
import {
  DEFAULT_BUILDING,
  DEFAULT_DEVICE,
} from '../../../tt-components/localBases';
import { HeaderWrap, Title, Subtitle } from '../../../_components/Headers';
import { Tooltip } from 'antd';
import { AdditionalAddress } from './Header.styled';
import { fullAddressesString } from 'utils/additionalAddressesString';

interface HeaderInterface {
  device: CalculatorResponse | null;
  setReport: Dispatch<SetStateAction<boolean>>;
  setDeregister: Dispatch<SetStateAction<boolean>>;
  setCheck: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({
  device,
  setReport,
  setDeregister,
  setCheck,
}: HeaderInterface) => {
  const { push } = useHistory();

  if (!device) {
    return <Loader size={'32'} show />;
  }

  const { address } = device || { address: DEFAULT_BUILDING };

  const { id } = address || DEFAULT_BUILDING;

  const access = getAccessesList();
  const { show } = access;
  const { model, serialNumber } = device || DEFAULT_DEVICE;

  const menuButtonArr = device
    ? [
        {
          title: 'Редактировать вычислитель',
          cb: () => push(`/calculators/${device.id}/edit`),
          show: show('CalculatorUpdate'),
          color: 'default',
        },
        {
          title: 'Выгрузить отчет о общедомовом потреблении',
          cb: () => {
            setReport(true);
          },
          show: show('ReportRead'),
          color: 'default',
        },
        {
          title: 'Добавить Узел',
          cb: () => {
            push(`/objects/${device?.address?.id}/add_node`);
          },
          show: show('CalculatorUpdate'),
          color: 'default',
        },
        {
          title: 'Поверить вычислитель',
          cb: () => {
            setCheck(true);
          },
          show: show('CalculatorUpdate'),
          color: 'default',
        },
        {
          title: 'Закрыть вычислитель',
          cb: () => {
            setDeregister(true);
          },
          show: show('MeteringDevicesClose'),
          color: 'red',
        },
      ]
    : null;

    const adAdress = fullAddressesString(address);

  return (
    <HeaderWrap
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Title>
          <IconTT icon={'device'} size={24} style={{ marginRight: '8px' }} />
          {`${model} (${serialNumber})`}
        </Title>
        <Subtitle to={`/objects/${id}`}>
        <Tooltip title={adAdress}>
            <AdditionalAddress>{adAdress}</AdditionalAddress>
          </Tooltip>
        </Subtitle>
      </div>
      <div style={{ position: 'relative' }}>
        <MenuButtonTT menuButtonArr={menuButtonArr} />
      </div>
    </HeaderWrap>
  );
};

export default Header;
