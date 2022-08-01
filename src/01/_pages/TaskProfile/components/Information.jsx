import React from "react";
import styled, { use } from "@reshadow/macro";
import { Link, useHistory, useParams } from "react-router-dom";

import { useStore } from "effector-react";
import styledComponent from "styled-components";
import { Loader } from "../../../components";
import { $task, TaskGate } from "../../../features/tasks/displayTask/models";
import { information } from "../../../r_comp";

export const Information = ({
  list = [],
  device = true,
  loading = true,
  ...props
}) => {
  const { push } = useHistory();

  const task = useStore($task);

  const isHousingDeviceMalfunction =
    task?.type === "HousingDeviceMalfunction" ||
    task?.type === "HousingDeviceMalfunctionNonCommercial";

  const params = useParams();

  return styled(information)`
    Loader {
      justify-self: center;
    }
  `(
    <information {...props}>
      <TaskGate id={Number(params[0])} />
      <h2>Подробная информация</h2>
      <Loader show={loading} size="20">
        <info_list>
          {list.map(({ title, value, url }, index) => {
            return (
              <info_item
                key={title}
                {...use({ url })}
                onClick={url ? () => push(url) : null}
              >
                <span>{title}</span>
                <span
                  style={{
                    color:
                      isHousingDeviceMalfunction && index === 0
                        ? "red"
                        : void 0,
                  }}
                >
                  {value}
                </span>
              </info_item>
            );
          })}
        </info_list>
      </Loader>
    </information>
  );
};

const StatisticLink = styledComponent(Link)`
  color: #FC525B;
  &:hover {
    color: #FC525B;
  }
`;

export default Information;
