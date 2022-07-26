import { Tooltip } from 'antd';
import { FC, useMemo } from 'react';
import { ContextMenuButton } from '../../../../../../01/shared/ui/ContextMenuButton';
import { WarningIcon } from '../../../../../../ui-kit/icons';
import { getHousingStockAddress } from '../../../../../../utils/getHousingStockAddress';
import {
  AdditionalAddress,
  Address,
  NumberOfTasks,
  Wrapper,
} from './HousingStockItem.styled';
import { HousingStockItemProps } from './HousingStockItem.types';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
}) => {
  const address = getHousingStockAddress(housingStock);
  const mainAddress = housingStock.address?.mainAddress;

  const additionalAddressesString = useMemo(() => {
    const additionalAddresses = housingStock.address?.additionalAddresses || [];
    
    return additionalAddresses
      .map((elem) => `${elem.street}, ${elem.number}`)
      .join('; ');
  }, [housingStock.address]);

  const numberOfTasks = useMemo(() => {
    return (
      Boolean(housingStock.numberOfTasks) && (
        <NumberOfTasks>
          <WarningIcon /> Задач: {housingStock.numberOfTasks}
        </NumberOfTasks>
      )
    );
  }, [housingStock.numberOfTasks]);

  return (
    <Wrapper to={`/objects/${housingStock.id}`}>
      <div>
        <Address>
          {address}
          {numberOfTasks}
        </Address>
        <Tooltip title={additionalAddressesString}>
          <AdditionalAddress>{additionalAddressesString}</AdditionalAddress>
        </Tooltip>
      </div>
      <div>{mainAddress?.city}</div>
      <div>{housingStock.houseType}</div>
      <ContextMenuButton size="small" />
    </Wrapper>
  );
};
