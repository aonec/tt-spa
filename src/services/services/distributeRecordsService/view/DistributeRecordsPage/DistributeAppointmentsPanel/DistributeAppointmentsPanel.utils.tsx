import type { DataNode } from 'antd/es/tree';
import { AppointmentResponse } from 'myApi';
import { ChevronSC } from './DistributeAppointmentsPanel.styled';
import _ from 'lodash';
import React from 'react'

export const getParentNode = (
  key: React.Key,
  tree: DataNode[],
): null | DataNode =>
  tree.reduce((acc, node) => {
    if (acc) {
      return acc;
    }

    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        acc = node;
      } else if (getParentNode(key, node.children)) {
        acc = getParentNode(key, node.children);
      }
    }

    return acc;
  }, null as null | DataNode);

  export const prepareAppointmentsToTree = (appointments:AppointmentResponse[]) => {
    const appointmentsGroupedByAddress = _.groupBy(
      appointments,
      (appointment) =>
        `ул. ${appointment.address?.street} ${appointment.address?.houseNumber}`,
    );

    const data: DataNode[] = Object.entries(appointmentsGroupedByAddress).map(
      ([key, children]) => ({
        key,
        title: key,
        className: 'treeRoot',
        switcherIcon: ({ expanded }) => (
          <ChevronSC expanded={expanded || false} />
        ),
        children: children.reduce((acc, appointment) => {
          const apartmentNumber = appointment.address?.apartmentNumber;
          
          if (!apartmentNumber) {
            return acc;
          }
          const title = `кв. ${apartmentNumber}`;
          return [...acc, { title, key: appointment.id }];
        }, [] as DataNode[]),
      }),
    );

    return data;
  }