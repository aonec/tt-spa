import React, { FC, useState } from 'react';
import { Margin, Wrapper } from './StandartWorkingRange.styled';
import {
  StandartWorkingRangeProps,
  WorkingRangeTabs,
} from './StandartWorkingRange.types';
import { TabsItemInterface } from '01/tt-components/interfaces';
import { PageHeader } from '01/shared/ui/PageHeader';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Tabs } from 'ui-kit/Tabs';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { useFormik } from 'formik';
import { ENodeWorkingRangeSeason } from 'myApi';

export const StandartWorkingRange: FC<StandartWorkingRangeProps> = ({}) => {
  const [currentTab, setTab] = useState<ENodeWorkingRangeSeason>(
    ENodeWorkingRangeSeason.HeatingSeason
  );

  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Отопительный сезон',
      key: WorkingRangeTabs.HeatingSeason,
      cb: () => setTab(ENodeWorkingRangeSeason.HeatingSeason),
    },
    {
      title: 'Межотопительный сезон',
      key: WorkingRangeTabs.InterHeating,
      cb: () => setTab(ENodeWorkingRangeSeason.InterHeating),
    },
  ];

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      nodeResourceType: null,
      season: null,
    },
    enableReinitialize: true,
    onSubmit: () => {},
    validateOnChange: false,
  });

  return (
    <Wrapper>
      <Margin>
        <GoBack />
      </Margin>
      <PageHeader
        title="Стандартные рабочие диапазоны"
        contextMenu={{
          menuButtons: [],
        }}
      />
      <Margin>
        <Tabs
          onChange={(value) => {
            setTab(value as ENodeWorkingRangeSeason);
          }}
          activeKey={currentTab}
        >
          <Tabs.TabPane
            tab="Отопительный сезон"
            key={ENodeWorkingRangeSeason.HeatingSeason}
          />
          <Tabs.TabPane
            tab="Межотопительный сезон"
            key={ENodeWorkingRangeSeason.InterHeating}
          />
        </Tabs>
      </Margin>

      <ResourceSelect resource={values.nodeResourceType} onChange={() => {}} />
    </Wrapper>
  );
};
