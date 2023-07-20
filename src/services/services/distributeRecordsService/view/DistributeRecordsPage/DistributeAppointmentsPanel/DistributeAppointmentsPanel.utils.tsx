import type { DataNode } from 'antd/es/tree';
import { AppointmentResponse } from 'api/types';
import { ChevronSC } from './DistributeAppointmentsPanel.styled';
import _ from 'lodash';
import React from 'react';
import { countSimilarityPoints } from 'utils/countSimilarityPoints';
import { AppointmentsIdWithController } from './DistributeAppointmentsPanel.types';

const getParentTitle = (appointment: AppointmentResponse) =>
  `ул. ${appointment.address?.street} ${appointment.address?.houseNumber}`;

const getAppointmentChildTitle = (apartmentNumber: string) =>
  `кв. ${apartmentNumber}`;

export const countSimilarityPointsForAppointment = (
  searchString: string,
  appointment: AppointmentResponse,
) => {
  const parentTitle = getParentTitle(appointment);
  const childTitle = appointment.address?.apartmentNumber
    ? getAppointmentChildTitle(appointment.address?.apartmentNumber)
    : '';

  const similarityPoints = countSimilarityPoints(
    searchString,
    `${parentTitle} ${childTitle}`,
  );

  return { ...appointment, similarityPoints, id: parentTitle };
};

export const prepareAppointmentsToTree = (
  initialAppointmentsArr: AppointmentResponse[],
) => {
  const appointmentsByControllers = _.groupBy(
    initialAppointmentsArr,
    'controllerId',
  );

  return Object.entries(appointmentsByControllers).reduce(
    (acc, [controllerId, appointments]) => {
      const appointmentsGroupedByAddress = _.groupBy(
        appointments,
        (appointment) => getParentTitle(appointment),
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
            return [
              ...acc,
              {
                title: getAppointmentChildTitle(apartmentNumber),
                key: appointment.id,
              },
            ];
          }, [] as DataNode[]),
        }),
      );

      return [
        ...acc,
        { data, controllerId: controllerId === 'null' ? null : controllerId },
      ];
    },
    [] as { data: DataNode[]; controllerId: string | null }[],
  );
};

export const getKeysByControllerId = (
  ids: AppointmentsIdWithController[],
  controllerId: string | null,
) =>
  ids
    .filter((elem) => elem.controllerId === controllerId)
    .map((elem) => elem.id);
