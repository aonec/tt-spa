import React, { FC, useCallback, useMemo } from 'react';
import {
  DownloadButtonWrapper,
  EmptyDescription,
  EmptyTitle,
  EmptyWrapper,
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
import { DocumentLargeIcon, DownloadBlueIcon } from 'ui-kit/icons';
import { ControllerResponse } from 'api/myApi';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';

export const AppointmentsJournalPage: FC<Props> = ({
  form,
  assignmentslist,
  controllersList,
  isLoadingAssygnments,
  downloadWorkFile,
}) => {
  const { fields } = useForm(form);

  const controllersMap = useMemo(() => {
    return controllersList.reduce((acc, controller) => {
      return { ...acc, [controller.id]: controller };
    }, {} as { [key: string]: ControllerResponse });
  }, [controllersList]);

  const handleDownloadFile = useCallback(
    (controllerId: string, date: string) => () => {
      downloadWorkFile({
        controllerId,
        date: moment(date).format('YYYY-MM-DD'),
      });
    },
    [downloadWorkFile],
  );

  return (
    <div>
      <GoBack />
      <PageHeaderWrapper>
        <PageHeader title="Журнал распределенных записей" />
      </PageHeaderWrapper>
      <SearchWrapper>
        <DatePicker
          value={fields.from.value || undefined}
          onChange={(value) => fields.from.onChange(value || moment())}
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
      <WithLoader isLoading={isLoadingAssygnments}>
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
                  size: '200px',
                  render: (assignment) => {
                    const user = controllersMap[assignment.controllerId];

                    if (!user) return '-';

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
                  size: '200px',
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
                  label: '',
                  size: '180px',
                  render: (assignment) => (
                    <DownloadButtonWrapper
                      onClick={handleDownloadFile(
                        assignment.controllerId,
                        assignment.date,
                      )}
                    >
                      <DownloadBlueIcon />
                      <div>Скачать задание</div>
                    </DownloadButtonWrapper>
                  ),
                },
              ]}
            />
          )}
          {!assignmentslist && (
            <EmptyWrapper>
              <DocumentLargeIcon />
              <EmptyTitle>Журнал записей пуст</EmptyTitle>
              <EmptyDescription>
                Перейдите в раздел “Распределить записи между контролерами”,
                чтобы добавить новые задания в журнал записей
              </EmptyDescription>
            </EmptyWrapper>
          )}
        </TableWrapper>
      </WithLoader>
    </div>
  );
};
