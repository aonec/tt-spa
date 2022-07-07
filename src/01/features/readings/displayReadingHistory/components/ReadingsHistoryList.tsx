import { Flex } from '01/shared/ui/Layout/Flex';
import { useEvent, useStore } from 'effector-react';
import moment from 'moment';
import {
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsMonthHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
  EResourceType,
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceResponse,
} from 'myApi';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useOpenedYears } from '../hooks/useOpenedYears';
import { ReactComponent as ArrowIconTop } from '../icons/arrow.svg';
import { ReactComponent as ArrowBottom } from '../icons/arrowBottom.svg';
import { RenderReadingFields } from './ReadingFields';
import { SourceName } from './SourceIcon';
import {
  getMonthName,
  getReadingValuesArray,
  getReadingValuesObject,
} from '../utils';
import { $individualDevice } from '01/features/individualDevices/displayIndividualDevice/models';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import { useReadingHistoryValues } from '../hooks/useReadingValues';
import { fetchReadingHistoryFx } from '../models';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { ConfirmReadingValueModal } from '../../readingsInput/confirmInputReadingModal';
import {
  CorrectReadingValuesValidationResult,
  round,
} from '01/hooks/useReadings';
import { openConfirmReadingModal } from '../../readingsInput/confirmInputReadingModal/models';
import { getMeasurementUnit } from '01/_pages/MetersPage/components/MeterDevices/components/ReadingsBlock';
import { ConsumptionRatesDictionary } from 'services/meters/managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';
import {
  managementFirmConsumptionRatesService,
  useManagingFirmConsumptionRates,
} from 'services/meters/managementFirmConsumptionRatesService';

interface Props {
  isModal?: boolean;
  readonly?: boolean;
}

const { outputs, inputs } = managementFirmConsumptionRatesService;

export const ReadingsHistoryList: React.FC<Props> = ({ isModal, readonly }) => {
  const {
    values,
    setFieldValue,
    uploadingReadingsStatuses,
    uploadReading,
    deleteReading,
  } = useReadingHistoryValues();
  const device = useStore($individualDevice);

  const readingsHistory = values;

  const pendingHistory = useStore(fetchReadingHistoryFx.pending);

  const consumptionRates = useStore(outputs.$consumptionRates);
  const loadConsumptionRates = useEvent(
    inputs.loadManagemenFirmConsumptionRates
  );

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    consumptionRates,
    loadConsumptionRates,
    device?.managementFirmId
  );

  const {
    isYearOpen,
    openYear,
    closeYear,
    openMonth,
    closeMonth,
    isMonthOpen,
  } = useOpenedYears(values?.yearReadings || []);

  interface RenderReading {
    reading?: IndividualDeviceReadingsItemHistoryResponse;
    isFirst?: boolean;
    arrowButton?: React.ReactElement;
    month: number;
    year: number;
    readingsLength: number;
    isHasArchived: boolean;
    prevReading?: IndividualDeviceReadingsItemHistoryResponse;
  }

  const rateNum = device && getIndividualDeviceRateNumByName(device.rateType);

  const renderReading = ({
    year,
    reading,
    isFirst,
    month,
    arrowButton,
    isHasArchived,
  }: RenderReading) => {
    const WrapComponent = isFirst ? Month : PreviousReading;

    const monthName = isFirst ? (
      <span className="month-name">{getMonthName(month)}</span>
    ) : (
      <div></div>
    );

    const getReadingValues = (
      type: 'value' | 'consumption' | 'averageConsumption'
    ) =>
      reading &&
      getReadingValuesArray(
        reading,
        type,
        getIndividualDeviceRateNumByName(device?.rateType!)
      );

    const readings = reading ? (
      <RenderReadingFields
        rateNum={rateNum}
        onEnter={(values) => {
          if (values.every((elem) => elem === null)) {
            return deleteReading(reading.id);
          }

          const request = () =>
            uploadReading({
              ...getReadingValuesObject(
                values,
                getIndividualDeviceRateNumByName(device?.rateType!)
              ),
              deviceId: device?.id!,
              readingDate:
                reading.readingDateTime || moment().toISOString(true),
              isForced: true,
            } as any);

          const prevReading =
            readingsHistory &&
            getPreviousReadingByHistory(readingsHistory, { month, year });

          if (prevReading && device) {
            const validationResult = validateReadings(
              getReadingValuesArray(
                prevReading,
                'value',
                rateNum!
              ).map((elem) => (typeof elem === 'string' ? Number(elem) : elem)),
              values,
              rateNum!,
              device?.resource!,
              managementFirmConsumptionRates
            );

            if (!validationResult || validationResult.validated) {
              return request();
            }

            return confirmReading(validationResult, request, device);
          }

          request();
        }}
        status={uploadingReadingsStatuses[`${month}.${year}`]}
        editable={isFirst && !readonly}
        values={getReadingValues('value') || []}
        suffix={device?.measurableUnitString}
        removed={reading.isRemoved}
        onChange={(value, index) =>
          setFieldValue(value, {
            year,
            month,
            id: reading.id,
            index,
          })
        }
      />
    ) : (
      <RenderReadingFields
        rateNum={rateNum}
        onEnter={(values) => {
          const request = () =>
            uploadReading({
              ...getReadingValuesObject(
                values,
                getIndividualDeviceRateNumByName(device?.rateType!)
              ),
              deviceId: device?.id!,
              readingDate: (() => {
                const date = moment(`${15}.${month}.${year}`, 'DD.MM.YYYY');

                date.set('month', month - 2);

                return date.toISOString();
              })(),
              isForced: true,
            } as any);

          const prevReading =
            readingsHistory &&
            getPreviousReadingByHistory(readingsHistory, { month, year });

          if (prevReading && device) {
            const validationResult = validateReadings(
              getReadingValuesArray(
                prevReading,
                'value',
                rateNum!
              ).map((elem) => (typeof elem === 'string' ? Number(elem) : elem)),
              values,
              rateNum!,
              device?.resource!,
              managementFirmConsumptionRates
            );

            if (!validationResult || validationResult.validated) {
              return request();
            }

            return confirmReading(validationResult, request, device);
          }

          request();
        }}
        editable={true}
        values={
          getReadingValues('value') ||
          getArrayByCountRange(
            getIndividualDeviceRateNumByName(device?.rateType! || 0),
            () => '' as any
          )
        }
        suffix={device?.measurableUnitString}
      />
    );

    const consumption = reading && (
      <RenderReadingFields
        rateNum={rateNum}
        suffix={device?.measurableUnitString}
        values={getReadingValues('consumption') || []}
        consumption
      />
    );

    const averageConsumption = reading && (
      <RenderReadingFields
        rateNum={rateNum}
        suffix={device?.measurableUnitString}
        values={getReadingValues('averageConsumption') || []}
        consumption
      />
    );

    const source = reading && (
      <SourceName sourceType={reading.source} user={reading.user} />
    );

    const uploadTime = reading && (
      <div>{moment(reading.uploadTime).format('DD.MM.YYYY HH:mm')}</div>
    );

    const arrowButtonComponent =
      isHasArchived && isFirst ? arrowButton : <ArrowButtonBlock />;

    return (
      <WrapComponent>
        {monthName}
        <div>{readings}</div>
        <div>{consumption}</div>
        <div>{averageConsumption}</div>
        <div>{source}</div>
        <div>{uploadTime}</div>
        {arrowButtonComponent}
      </WrapComponent>
    );
  };

  const renderMonth = ({
    month,
    year,
    readings,
    prevReading,
  }: IndividualDeviceReadingsMonthHistoryResponse & {
    year: number;
    prevReading?: IndividualDeviceReadingsItemHistoryResponse;
  }) => {
    const isOpen = isMonthOpen(year, month);

    const arrowButton = (
      <ArrowButton
        onClick={() => (isOpen ? closeMonth : openMonth)(year, month)}
      >
        <Arrow open={isOpen} />
      </ArrowButton>
    );

    if (!readings?.length) return null;

    const previewReading = readings.find((elem) => !elem.isArchived) || void 0;

    const firstReadingline = renderReading({
      reading: previewReading,
      isFirst: true,
      arrowButton,
      year,
      month,
      readingsLength: readings.length,
      isHasArchived: readings.some((elem) => elem.isArchived),
      prevReading,
    });

    return (
      <>
        {firstReadingline}
        {isOpen &&
          readings
            .filter((elem) => elem.isArchived)
            ?.map((reading) =>
              renderReading({
                reading,
                month,
                isFirst: false,
                arrowButton,
                year,
                readingsLength: readings.length,
                isHasArchived: readings.some((elem) => elem.isArchived),
              })
            )}
      </>
    );
  };

  const getActiveReadings = (
    readings?: IndividualDeviceReadingsItemHistoryResponse[] | null
  ) => {
    if (!readings) return;

    return readings.find((elem) => !elem.isArchived) || void 0;
  };

  const renderYear = ({
    year,
    monthReadings,
    prevMonths,
  }: IndividualDeviceReadingsYearHistoryResponse & {
    prevMonths?: IndividualDeviceReadingsMonthHistoryResponse[] | null;
  }) => {
    const isOpen = isYearOpen(year);

    return (
      <>
        <Year onClick={() => (isOpen ? closeYear : openYear)(year)}>
          <div>{year} год</div>
          <Arrow open={isOpen} />
        </Year>
        {isOpen &&
          monthReadings?.map((month, index) =>
            renderMonth({
              ...month,
              year,
              prevReading:
                getActiveReadings(monthReadings[index + 1]?.readings) ||
                getActiveReadings(prevMonths && prevMonths[0]?.readings),
            })
          )}
      </>
    );
  };

  return (
    <Wrap isModal={isModal}>
      <GradientLoader loading={pendingHistory} />
      <ConfirmReadingValueModal />
      <TableHeader>
        {columnsNames.map((elem) => (
          <div>{elem}</div>
        ))}
      </TableHeader>
      {values?.yearReadings?.map((yearReading, index) =>
        renderYear({
          ...yearReading,
          prevMonths:
            values?.yearReadings &&
            values?.yearReadings[index + 1]?.monthReadings,
        })
      )}
    </Wrap>
  );
};

const validateReadings = (
  prevValues: (number | null)[],
  newValues: (number | null)[],
  rateNum: number,
  resource: EResourceType,
  limits?: ConsumptionRatesDictionary
) => {
  const limit = limits && limits[resource]?.maximumConsumptionRate;

  if (!limit) return false;

  const res = newValues.reduce(
    (acc, elem, index) => {
      if (index + 1 > rateNum) return acc;

      const currentValue = Number(elem) || 0;
      const prevValue = Number(prevValues[index]) || 0;

      const isDown = currentValue < prevValue;
      const isUp = currentValue - prevValue > limit;
      const type: 'up' | 'down' | null = isUp ? 'up' : isDown ? 'down' : null;
      const difference = currentValue - prevValue;

      const validated = acc.validated && !isDown && !isUp;

      return {
        ...acc,
        validated,
        valuesValidationResults: [
          ...(acc.valuesValidationResults || []),
          {
            validated,
            index: index + 1,
            type,
            difference,
            currentValue,
            prevValue,
          },
        ],
      };
    },
    { validated: true, limit } as CorrectReadingValuesValidationResult
  );

  return res;
};

const Arrow = ({ open }: { open?: boolean }) =>
  open ? <ArrowIconTop /> : <ArrowBottom />;

const columnsNames = [
  'Период',
  'Показания',
  'Потребление',
  'Ср. потребление',
  'Источник',
  'Последние показания',
];

const slide = keyframes`
  0% {
		background-position: 100% 0%;
	}
	100% {
		background-position: 0% 0%;
	} 
`;

const GradientLoader = styled.div`
  background: ${(props: { loading: boolean }) =>
    props.loading
      ? `repeating-linear-gradient(
    45deg,
    #e8ebff,
    #e8ebff 10px,
    #7584d6 10px,
    #7584d6 20px
  )`
      : 'none'};
  height: 5px;
  background-size: 400% 400%;
  animation: ${slide} 40s linear infinite;
  transform: scale(1, -1);
`;

interface WrapProps {
  isModal?: boolean;
}

const Wrap = styled.div`
  max-width: 1080px;
  ${({ isModal }: WrapProps) =>
    isModal
      ? `

    max-height: 520px;
    overflow-y: auto;
  
  `
      : ''}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr 0.75fr 0.85fr 1.35fr 1fr 30px;
`;

const TableHeader = styled(Grid)`
  padding: 16px;
  background: rgba(39, 47, 90, 0.04);
  border-bottom: 1px solid #dcdee4;
`;

const Year = styled(Flex)`
  font-size: 14px;
  user-select: none;
  cursor: pointer;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #dcdee4;
`;

const Month = styled(Grid)`
  padding: 16px;
  align-items: center;
  user-select: none;
  color: #272f5ab2;

  .month-name {
    text-transform: capitalize;
    font-weight: 600;
    font-size: 16px;
    color: #272f5a;
  }
`;

const PreviousReading = styled(Month)`
  background: #272f5a08;
`;

const ArrowButton = styled(Flex)`
  justify-content: center;
  transform: translateX(10px);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background: #eff0f1;
  }
`;

const ArrowButtonBlock = styled.div`
  width: 30px;
  height: 30px;
`;

const getPreviousReadingByHistory = (
  readingsHistoryRaw: IndividualDeviceReadingsHistoryResponse,
  address: { year: number; month: number }
): IndividualDeviceReadingsItemHistoryResponse | null => {
  const readingsHistoryClone: IndividualDeviceReadingsHistoryResponse = getClone(
    readingsHistoryRaw
  );

  const readingsHistoryCleared = readingsHistoryClone.yearReadings
    ?.map((yearReading) =>
      yearReading.monthReadings?.map((monthReading) => {
        const activeReading = monthReading.readings?.find(
          (reading) => !reading.isArchived && !reading.isRemoved
        );

        return {
          reading: activeReading,
          month: monthReading.month,
          year: yearReading.year,
        };
      })
    )
    .flat();

  const currentIndex = readingsHistoryCleared?.reduce(
    (acc, readingsHistoryElement, index) =>
      readingsHistoryElement?.month === address.month &&
      readingsHistoryElement?.year === address.year
        ? index
        : acc,
    null as number | null
  );

  if (typeof currentIndex !== 'number') return null;

  const res =
    readingsHistoryCleared
      ?.slice(currentIndex + 1, readingsHistoryCleared.length)
      .find((elem) => Boolean(elem?.reading))?.reading || null;

  return res;
};

export function getClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

const confirmReading = (
  { valuesValidationResults, limit }: CorrectReadingValuesValidationResult,
  callback: () => void,
  device: IndividualDeviceResponse
) => {
  const neededValueWarning = valuesValidationResults?.find((elem) =>
    Boolean(elem.type)
  );

  const unit = getMeasurementUnit(device.resource);

  if (neededValueWarning?.type === 'down') {
    const failedReadingValidateResult = valuesValidationResults?.find(
      (elem) => !elem.validated
    );

    openConfirmReadingModal({
      title: (
        <>
          Введенное показание по прибору <b>{device.serialNumber}</b> (
          {device.model}) меньше предыдущего на T
          {failedReadingValidateResult?.index}:{' '}
          <b>
            {Math.abs(round(failedReadingValidateResult?.difference || 0, 3))}{' '}
            {unit}{' '}
          </b>
        </>
      ),
      callback: () => void callback(),
    });
    return;
  }

  openConfirmReadingModal({
    title: `${
      neededValueWarning?.type === 'up'
        ? `Расход ${round(
            neededValueWarning.difference,
            3
          )}${unit}, больше чем лимит ${limit}${unit}`
        : ''
    }`,
    callback: () => void callback(),
  });
};
