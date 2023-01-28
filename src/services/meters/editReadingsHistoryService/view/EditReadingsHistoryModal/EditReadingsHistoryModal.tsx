import { ModalTT } from '01/shared/ui/ModalTT';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import moment from 'moment';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { MetersInputsBlockPure } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MeterInputsBlockPure';
import {
  getRateNum,
} from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.utils';
import { ChevronIcon } from 'ui-kit/icons';
import { ReadingDateFormat } from '../../editReadingsHistoryService.constants';
import {
  ArrowContainer,
  DatePickerSC,
  Header,
  MonthSliderWrapper,
  Wrapper,
} from './EditReadingsHistoryModal.styled';
import { EditReadingsHistoryModalProps } from './EditReadingsHistoryModal.types';

export const EditReadingsHistoryModal: FC<EditReadingsHistoryModalProps> = ({
  handleCloseModal,
  isOpen,
  device,
  readingDate,
  setReadingDate,
  readings,
  setReadings,
  editReadings,
}) => {
  const [isActive, setIsActive] = useState(false);

  const { rateType, resource } = device;
  const rateNum = rateType ? getRateNum(rateType) : 0;

  const isCanUp = useMemo(
    () => moment().startOf('month').diff(readingDate, 'month') !== 0,
    [readingDate]
  );

  const upMonth = useCallback(() => {
    if (isCanUp) {
      const date = moment(readingDate, ReadingDateFormat).add(1, 'month');
      setReadingDate(date.format(ReadingDateFormat));
    }
  }, [setReadingDate, readingDate]);

  const downMonth = useCallback(() => {
    const date = moment(readingDate, ReadingDateFormat).subtract(1, 'month');
    setReadingDate(date.format(ReadingDateFormat));
  }, [setReadingDate, readingDate]);

  const handleChangeReadingValues = (e: React.ChangeEvent<HTMLInputElement>) =>
    setReadings({
      ...readings,
      [e.target.name]: e.target.value,
    });

  return (
    <ModalTT
      title="Ввод показаний за произвольный период"
      saveBtnText="Сохранить показание"
      onCancel={handleCloseModal}
      onSubmit={editReadings}
      visible={isOpen}
    >
      <>
        <Header>
          <div className="device-info">Информация о приборе</div>
          <MonthSliderWrapper>
            <ArrowContainer onClick={downMonth}>
              <ChevronIcon />
            </ArrowContainer>
            <DatePickerSC
              value={moment(readingDate, ReadingDateFormat)}
              format="MMMM YYYY"
              picker="month"
              isActive={isActive}
              onOpenChange={(isOpen) => setIsActive(isOpen)}
              inputReadOnly
              bordered={false}
              onChange={(date) => {
                const selectedMonth = date
                  ?.startOf('month')
                  .format(ReadingDateFormat);
                const currentDate = moment()
                  .startOf('month')
                  .format(ReadingDateFormat);
                setReadingDate(selectedMonth || currentDate);
              }}
              disabledDate={(month) => {
                const currentMonth = moment().startOf('month');
                const selectedMonth = month.startOf('month');
                const diff = currentMonth.diff(selectedMonth, 'month');
                return diff < 0;
              }}
            />
            <ArrowContainer onClick={upMonth} isDisabled={!isCanUp}>
              <ChevronIcon className="right-chevron" />
            </ArrowContainer>
          </MonthSliderWrapper>
        </Header>
        <Wrapper>
          <DeviceInfo device={device} />
          <MetersInputsBlockPure
            resource={resource}
            rateNum={rateNum}
            bufferedReadingValues={readings}
            handleReadingInputChange={handleChangeReadingValues}
          />
        </Wrapper>
      </>
    </ModalTT>
  );
};
