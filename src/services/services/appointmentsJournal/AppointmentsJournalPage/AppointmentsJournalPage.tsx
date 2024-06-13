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
import { FormType, Props } from './AppointmentsJournalPage.types';
import { GoBack } from 'ui-kit/shared/GoBack';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { DatePicker } from 'ui-kit/DatePicker';
import { Table } from 'ui-kit/Table';
import dayjs from 'api/dayjs';
import { DocumentLargeIcon, DownloadBlueIcon } from 'ui-kit/icons';
import { ControllerResponse } from 'api/types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { useFormik } from 'formik';

export const AppointmentsJournalPage: FC<Props> = ({
  assignmentslist,
  controllersList,
  isLoadingAssygnments,
  downloadWorkFile,
  formValues,
  setForm,
}) => {
  const { values, submitForm, setFieldValue } = useFormik<FormType>({
    initialValues: {
      from: formValues.from,
      to: formValues.to,
    },
    onSubmit: (values) => {
      setForm(values);
    },
  });

  const controllersMap = useMemo(() => {
    return controllersList.reduce((acc, controller) => {
      return { ...acc, [controller.id]: controller };
    }, {} as { [key: string]: ControllerResponse });
  }, [controllersList]);

  const handleDownloadFile = useCallback(
    (assignmentId: string) => () => {
      downloadWorkFile({
        assignmentId,
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
          value={values.from || undefined}
          onChange={(value) => {
            setFieldValue('from', value || dayjs());
            submitForm();
          }}
          small
          format="DD.MM.YYYY"
          placeholder="От"
          allowClear={false}
        />
        <DatePicker
          value={values.to || undefined}
          onChange={(value) => {
            setFieldValue('to', value);
            submitForm();
          }}
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
                    <b>{dayjs(assignment.date).format('DD.MM.YYYY')}</b>
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
                    dayjs(assignment.createDateTimeUtc).format('DD.MM.YYYY'),
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
                      onClick={handleDownloadFile(assignment.id)}
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
