import React, { FC } from 'react';
import {
  PageHeaderWrapper,
  SearchWrapper,
  TableWrapper,
} from './AppointmentsJournalPage.styled';
import { Props } from './AppointmentsJournalPage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { DatePicker } from 'ui-kit/DatePicker';
import { useForm } from 'effector-forms';
import { Table } from 'ui-kit/Table';
import moment from 'moment';

export const AppointmentsJournalPage: FC<Props> = ({
  form,
  assignmentslist,
}) => {
  const { fields } = useForm(form);

  return (
    <div>
      <GoBack />
      <PageHeaderWrapper>
        <PageHeader title="Журнал распределенных записей" />
      </PageHeaderWrapper>
      <SearchWrapper>
        <DatePicker
          value={fields.from.value || undefined}
          onChange={(value) => value && fields.from.onChange(value)}
          small
          format="DD.MM.YYYY"
          placeholder="От"
        />
        <DatePicker
          value={fields.to.value || undefined}
          onChange={fields.to.onChange}
          small
          format="DD.MM.YYYY"
          placeholder="До"
        />
      </SearchWrapper>
      <TableWrapper>
        {assignmentslist && (
          <Table
            elements={assignmentslist}
            columns={[
              {
                label: 'Дата заявки',
                size: '140px',
                render: (assignment) => (
                  <b>{moment(assignment.date).format('DD.MM.YYYY')}</b>
                ),
              },
              {
                label: 'ФИО исполнителя',
                size: '188px',
                render: (assignment) => {
                  const user = assignment.creatingUser;

                  const lastName = user?.lastName?.[0];
                  const middleName = user?.middleName?.[0];

                  return `${user?.firstName} ${
                    lastName ? lastName + '.' : ''
                  } ${middleName ? middleName + '.' : ''}`;
                },
              },
              {
                label: 'Количество адресов',
                size: '140px',
                render: (assignment) => assignment.appointmentsCount,
              },
              {
                label: 'Дата формирования',
                size: '140px',
                render: (assignment) =>
                  moment(assignment.createDateTimeUtc).format('DD.MM.YYYY'),
              },
              {
                label: 'ФИО оператора',
                size: '188px',
                render: (assignment) => {
                  const user = assignment.creatingUser;

                  const lastName = user?.lastName?.[0];
                  const middleName = user?.middleName?.[0];

                  return `${user?.firstName} ${
                    lastName ? lastName + '.' : ''
                  } ${middleName ? middleName + '.' : ''}`;
                },
              },
            ]}
          />
        )}
      </TableWrapper>
    </div>
  );
};
