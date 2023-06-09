import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { FilterExtendedSearch } from '.';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import { EActResourceType } from 'myApi';
import {
  IndividualDeviceConsumptionGraphLookup,
  IndividualDeviceConsumptionGraphType,
} from 'services/devices/devicesPageService/individualDevicesProfileService/view/IndividualDevicesProfile/individualDevicesListService/individualDevicesListService.constants';

export default {
  title: 'FilterExtendedSearch',
  component: FilterExtendedSearch,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof FilterExtendedSearch>;

export const Overview = () => {
  const [filters, setFilters] = useState<EActResourceType[]>([]);

  const resources = Object.entries(actResourceNamesLookup).map(
    ([key, value]) => ({ key: key as EActResourceType, value }),
  );

  return (
    <div style={{ height: '200px' }}>
      <FilterExtendedSearch
        allowedFilters={resources}
        handleUpdate={setFilters}
        selectedFilters={filters || []}
      />
    </div>
  );
};

export const OnlyOneSelected = () => {
  const [selectedType, setType] = useState(
    IndividualDeviceConsumptionGraphType.BySixMonths,
  );

  return (
    <FilterExtendedSearch
      allowedFilters={Object.entries(
        IndividualDeviceConsumptionGraphLookup,
      ).map(([key, value]) => ({
        key: key as IndividualDeviceConsumptionGraphType,
        value,
      }))}
      selectedFilters={[selectedType]}
      handleUpdate={(types) => setType(types[0])}
      allowClear={false}
      max={1}
    />
  );
};
