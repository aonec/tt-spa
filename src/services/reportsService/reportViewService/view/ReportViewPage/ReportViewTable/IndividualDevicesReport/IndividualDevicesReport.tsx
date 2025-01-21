import { FC } from 'react';
import {
  ApartmentNumber,
  ClosingDate,
  FullAddressWrapper,
  LinkSc,
  PhoneNumber,
  ResourceWrapper,
} from './IndividualDevicesReport.styled';
import { IndividualDevicesReportProps } from './IndividualDevicesReport.types';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import {
  ClosingReasonsDictionary,
  ResourceShortNamesDictionary,
} from 'dictionaries';
import { Table } from 'ui-kit/Table';
import {
  EConstructedReportDeviceStatus,
  EIndividualDeviceReportOption,
  ESecuredIdentityRoleName,
} from 'api/types';
import dayjs from 'api/dayjs';
import { Empty } from 'antd';
import { getReportElemAddress } from '../ReportViewTable.utils';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { usePermission } from 'hooks/usePermission';

export const IndividualDevicesReport: FC<IndividualDevicesReportProps> = ({
  individualDevicesReportData,
  reportOption,
}) => {
  const isDeviceCheckingDateExpirationOption =
    reportOption === EIndividualDeviceReportOption.DeviceCheckingDateExpiration;

  const isClosedDeviceOnOneOfRisersOption =
    reportOption === EIndividualDeviceReportOption.ClosedDeviceOnOneOfRisers;

  const isClosedDeviceOption =
    reportOption === EIndividualDeviceReportOption.ClosedDevices;

  const isInvalidCheckingDates =
    reportOption === EIndividualDeviceReportOption.InvalidCheckingDates;

  const isInvalidBitDepth =
    reportOption === EIndividualDeviceReportOption.InvalidBitDepth;

  const isOperators = usePermission([
    ESecuredIdentityRoleName.Operator,
    ESecuredIdentityRoleName.SeniorOperator,
  ]);

  if (!individualDevicesReportData) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={'Выберите фильтры для формирования отчета'}
      />
    );
  }

  return (
    <Table
      isSticky
      link={(device) => {
        if (isInvalidBitDepth) {
          return `/apartments/${device.apartmentId}/testimony`;
        }

        return null;
      }}
      columns={[
        {
          label: 'Адрес',
          size: '230px',
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
          hidden: !isDeviceCheckingDateExpirationOption,
          render: (elem) =>
            dayjs(
              elem.deviceCheckingDateExpirationOption?.lastCheckingDate,
            ).format('DD.MM.YYYY'),
        },
        {
          label: 'Дата следующей поверки',
          size: '170px',
          hidden: !isDeviceCheckingDateExpirationOption,
          render: (elem) =>
            dayjs(
              elem.deviceCheckingDateExpirationOption?.futureCheckingDate,
            ).format('DD.MM.YYYY'),
        },
        {
          label: 'Номер телефона',
          size: '400px',
          hidden: !isDeviceCheckingDateExpirationOption,
          render: (elem) => (
            <PhoneNumber>
              {(
                elem.deviceCheckingDateExpirationOption
                  ?.homeownerPhoneNumbers || []
              ).join(', ')}
            </PhoneNumber>
          ),
        },
        {
          label: 'Дата поверки',
          size: '150px',
          hidden: !isClosedDeviceOnOneOfRisersOption,
          render: (elem) =>
            dayjs(elem.closedDeviceOnOneOfRisersOption?.checkingDate).format(
              'DD.MM.YYYY',
            ),
        },
        {
          label: 'Дата поверки',
          size: '150px',
          hidden: !isClosedDeviceOption,
          render: (elem) =>
            dayjs(elem.closedDevicesOption?.checkingDate).format('DD.MM.YYYY'),
        },
        {
          label: 'Статус',
          size: '300px',
          hidden: !isClosedDeviceOption,
          render: (elem) => {
            const closingStatus =
              elem.closedDevicesOption?.status ===
              EConstructedReportDeviceStatus.Open
                ? 'Открыт'
                : 'Закрыт';

            const closingReason =
              elem.closedDevicesOption?.closingReason &&
              `(${
                ClosingReasonsDictionary[elem.closedDevicesOption.closingReason]
              })`;

            const closingDate = dayjs(
              elem.closedDevicesOption?.closingDate,
            ).format('DD.MM.YYYY');

            return (
              <div>
                {`${closingStatus} ${closingReason}`}
                <ClosingDate>{closingDate}</ClosingDate>
              </div>
            );
          },
        },
        {
          label: 'Дата последней поверки',
          size: '170px',
          hidden: !isInvalidCheckingDates,
          render: (elem) =>
            dayjs(elem.invalidCheckingDatesOption?.lastCheckingDate).format(
              'DD.MM.YYYY',
            ),
        },
        {
          label: 'Дата следующей поверки',
          size: '120px',
          hidden: !isInvalidCheckingDates,
          render: (elem) =>
            dayjs(elem.invalidCheckingDatesOption?.futureCheckingDate).format(
              'DD.MM.YYYY',
            ),
        },
        {
          label: 'Разрядность',
          size: '120px',
          hidden: !isInvalidBitDepth,
          render: (elem) => elem.invalidBitDepthOption?.bitDepth || '—',
        },
        {
          label: 'Множитель',
          size: '120px',
          hidden: !isInvalidBitDepth,
          render: (elem) => elem.invalidBitDepthOption?.scaleFactor || '—',
        },
      ]}
      elements={individualDevicesReportData}
      pagination={{ pageSize: 50 }}
    />
  );
};
