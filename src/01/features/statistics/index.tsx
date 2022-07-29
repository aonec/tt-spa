import { Tabs } from "antd";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { SubscribersConsumption } from "./subscribersConsumption";
import { Title } from "../../_components/Headers";

const { TabPane } = Tabs;

export const StatisticsPage = () => {
  const [tab, setTab] = useState<
    "subscribersConsumption" | "tasks" | "resourceConsumption"
  >("subscribersConsumption");
  const history = useHistory();

  useEffect(() => history.push(tab), [tab]);

  const currentTabFromLocation = (
    history.location.pathname.split("/") as any
  )[2];

  useEffect(() => setTab(currentTabFromLocation), []);

  return (
    <div>
      <Title>Статистика</Title>
      <Tabs activeKey={tab} onChange={(value: any) => setTab(value)}>
        <TabPane
          style={{ overflow: "none" }}
          tab="Учет абонентского потребления"
          key="subscribersConsumption"
        >
          <SubscribersConsumption />
        </TabPane>
        <TabPane tab="Анализ количества задач" key="tasks"></TabPane>
        <TabPane
          tab="Анализ потребления ресурсов"
          key="resourceConsumption"
        ></TabPane>
      </Tabs>
    </div>
  );
};
