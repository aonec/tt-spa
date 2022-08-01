import { Route, useHistory, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getHousingTasks, getHousingMeteringDevice } from "./apiHousingProfile";
import { Header } from "./components/Header";
import { Information } from "./components/Information";
import Documents from "./components/Documents";
import { RelatedDevices } from "./components/RelatedDevices";

import { useAsync } from "../../hooks/useAsync";
import { TabsItemInterface } from "../../tt-components/interfaces";
import Tabs from "../../tt-components/Tabs";
import ModalDeregister from "../../tt-components/ModalDeregister";
import ModalCheckDevice from "../../_modals/ModalCheckDevice";
import Events from "../../tt-components/Events";
import Grid from "../../_components/Grid";
import {
  PipeHousingMeteringDeviceResponse,
  TaskListResponse,
} from "../../../api/types";

export const HousingProfile = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const { push } = useHistory();
  const path = `/housingMeteringDevices/${deviceId}`;

  const {
    data: device,
    status,
    run,
  } = useAsync<PipeHousingMeteringDeviceResponse>();

  const [tasks, setTasks] = useState<TaskListResponse[] | null>();
  const [deregister, setDeregister] = useState<boolean>(false);
  const [checkVisible, setCheckVisible] = useState(false);

  useEffect(() => {
    run(getHousingMeteringDevice(Number(deviceId)));
  }, [deviceId]);

  useEffect(() => {
    getHousingTasks(Number(deviceId)).then((res: any) => {
      setTasks(res);
    });
  }, []);

  if (!device || !tasks) {
    return null;
  }

  const tabItems: Array<TabsItemInterface> = [
    {
      title: "Общая информация",
      key: "",
      cb: () => {
        push(`${path}`);
      },
    },
    {
      title: "Подключенные приборы",
      key: "related",
      cb: () => {
        push(`${path}/related`);
      },
    },
    {
      title: "Документы",
      key: "documents",
      cb: () => {
        push(`${path}/documents`);
      },
    },
  ];

  return (
    <>
      <Header
        device={device}
        setDeregister={setDeregister}
        setCheckVisible={setCheckVisible}
      />
      <Tabs tabItems={tabItems} tabsType={"route"} />
      <Grid>
        <Route path={`${path}`} exact>
          <Information device={device} />
        </Route>
        <Route path={`${path}/related`} exact>
          <RelatedDevices device={device} />
        </Route>
        <Route path={`${path}/documents`} exact>
          <Documents />
        </Route>
        <Events title="Задачи с объектом" tasks={tasks} />
      </Grid>
      <ModalDeregister
        visible={deregister}
        setVisible={setDeregister}
        device={device}
      />
      <ModalCheckDevice
        device={device}
        visible={checkVisible}
        setVisible={setCheckVisible}
      />
    </>
  );
};

export default HousingProfile;
