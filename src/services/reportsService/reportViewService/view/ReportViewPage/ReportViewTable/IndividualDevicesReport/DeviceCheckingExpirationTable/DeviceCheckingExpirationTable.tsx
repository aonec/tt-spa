import { FC, useMemo } from 'react';
import {
  HeaderStyles,
  PhoneNumber,
  ReadingDate,
  ReadingValue,
  ReadingWrapper,
  Title,
  Wrapper,
} from './DeviceCheckingExpirationTable.styled';
import { FormValues, Props } from './DeviceCheckingExpirationTable.types';
import { Table } from 'ui-kit/Table';
import {
  ApartmentNumber,
  FullAddressWrapper,
  LinkSc,
  ResourceWrapper,
} from '../IndividualDevicesReport.styled';
import { getReportElemAddress } from '../../ReportViewTable.utils';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { ResourceShortNamesDictionary } from 'dictionaries';
import dayjs from 'dayjs';
import { SortButton } from 'services/actsJournalService/view/ActsJournalProfile/ActsListHeader/SortButton';
import { useFormik } from 'formik';
import { EOrderByRule } from 'api/types';

export const DeviceCheckingExpirationTable: FC<Props> = ({
  individualDevicesReportData,
  isOperators,
}) => {
  const { values, setValues } = useFormik<FormValues>({
    initialValues: {
      addressOrderBy: null,
      lastCheckOrderBy: null,
      nextCheckOrderBy: null,
    },
    onSubmit: () => {},
  });

  const sortedDevices = useMemo(() => {
    if (!individualDevicesReportData) return [];

    const sortedData = [...individualDevicesReportData];

    if (values.addressOrderBy) {
      sortedData.sort((a, b) => {
        const addressA = getReportElemAddress(a).addressString || '';
        const addressB = getReportElemAddress(b).addressString || '';
        return values.addressOrderBy === EOrderByRule.Ascending
          ? addressA.localeCompare(addressB)
          : addressB.localeCompare(addressA);
      });
    } else if (values.lastCheckOrderBy) {
      sortedData.sort((a, b) => {
        const dateA = dayjs(
          a.deviceCheckingDateExpirationOption?.lastCheckingDate,
        ).valueOf();
        const dateB = dayjs(
          b.deviceCheckingDateExpirationOption?.lastCheckingDate,
        ).valueOf();
        return values.lastCheckOrderBy === EOrderByRule.Ascending
          ? dateA - dateB
          : dateB - dateA;
      });
    } else if (values.nextCheckOrderBy) {
      sortedData.sort((a, b) => {
        const dateA = dayjs(
          a.deviceCheckingDateExpirationOption?.futureCheckingDate,
        ).valueOf();
        const dateB = dayjs(
          b.deviceCheckingDateExpirationOption?.futureCheckingDate,
        ).valueOf();
        return values.nextCheckOrderBy === EOrderByRule.Ascending
          ? dateA - dateB
          : dateB - dateA;
      });
    }

    return sortedData;
  }, [individualDevicesReportData, values]);

  return (
    <Table
      elements={sortedDevices}
      pagination={{ pageSize: 50 }}
      headerStyles={HeaderStyles}
      isSticky
      extraHeader={
        <Wrapper>
          <Title>
            Адрес
            <SortButton
              onChange={(value) =>
                setValues({
                  addressOrderBy: value || null,
                  lastCheckOrderBy: null,
                  nextCheckOrderBy: null,
                })
              }
              value={values.addressOrderBy || undefined}
            />
          </Title>
          <Title>Ресурс</Title>
          <Title>Серийный номер</Title>
          <Title>Модель</Title>
          <Title>
            Дата последней поверки
            <SortButton
              onChange={(value) =>
                setValues({
                  addressOrderBy: null,
                  lastCheckOrderBy: value || null,
                  nextCheckOrderBy: null,
                })
              }
              value={values.lastCheckOrderBy || undefined}
            />
          </Title>
          <Title>
            Дата следующей поверки
            <SortButton
              onChange={(value) =>
                setValues({
                  addressOrderBy: null,
                  lastCheckOrderBy: null,
                  nextCheckOrderBy: value || null,
                })
              }
              value={values.nextCheckOrderBy || undefined}
            />
          </Title>
          <Title>Последнее показание</Title>
          <Title>Номер телефона</Title>
        </Wrapper>
      }
      columns={[
        {
          label: 'Адрес',
          size: '300px',
          render: (elem) => {
            const { addressString, number } = getReportElemAddress(elem);

            const apartmentNumber = isOperators ? (
              <LinkSc
                target="_blank"
                to={`/meters/apartments/${elem.apartmentId}`}
              >
                Кв. №{number}
              </LinkSc>
            ) : (
              <ApartmentNumber>Кв. №{number}</ApartmentNumber>
            );

            return (
              <FullAddressWrapper>
                {apartmentNumber}
                <Tooltip zIndex={10} title={addressString}>
                  {addressString}
                </Tooltip>
              </FullAddressWrapper>
            );
          },
        },
        {
          label: 'Ресурс',
          size: '110px',
          render: (elem) => (
            <ResourceWrapper>
              <ResourceIconLookup resource={elem.resource} />
              <div>{ResourceShortNamesDictionary[elem.resource]}</div>
            </ResourceWrapper>
          ),
        },
        {
          label: 'Серийный номер',
          size: '150px',
          render: (elem) => elem.serialNumber,
        },
        {
          label: 'Модель',
          size: '180px',
          render: (elem) => elem.model,
        },
        {
          label: 'Дата последней поверки',
          size: '170px',
          render: (elem) =>
            dayjs(
              elem.deviceCheckingDateExpirationOption?.lastCheckingDate,
            ).format('DD.MM.YYYY'),
        },
        {
          label: 'Дата следующей поверки',
          size: '170px',
          render: (elem) =>
            dayjs(
              elem.deviceCheckingDateExpirationOption?.futureCheckingDate,
            ).format('DD.MM.YYYY'),
        },
        {
          label: 'Последнее показание',
          size: '170px',
          render: (elem) => (
            <ReadingWrapper>
              <ReadingValue>
                <div>
                  {elem.deviceCheckingDateExpirationOption?.lastReading
                    ?.value1 || '-'}
                </div>
                <div>
                  {elem.deviceCheckingDateExpirationOption?.lastReading?.value2}
                </div>
              </ReadingValue>
              <ReadingDate>
                {dayjs(
                  elem.deviceCheckingDateExpirationOption?.lastReading
                    ?.actualReadingDate,
                ).format('DD.MM.YYYY')}
              </ReadingDate>
            </ReadingWrapper>
          ),
        },
        {
          label: 'Номер телефона',
          size: '400px',
          render: (elem) => (
            <PhoneNumber>
              {(
                elem.deviceCheckingDateExpirationOption
                  ?.homeownerPhoneNumbers || []
              ).join(', ')}
            </PhoneNumber>
          ),
        },
      ]}
    />
  );
};
