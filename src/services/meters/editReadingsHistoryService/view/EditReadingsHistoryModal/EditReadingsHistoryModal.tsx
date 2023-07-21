import moment from 'moment';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { MetersInputsBlockPure } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MeterInputsBlockPure';
import { getRateNum } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.utils';
import { ChevronIcon } from 'ui-kit/icons';
import { IndividualDeviceInfoExtended } from 'ui-kit/shared/IndividualDeviceInfoExtended';
import { ReadingDateFormat } from '../../editReadingsHistoryService.constants';
import {
  ArrowContainer,
  DatePickerSC,
  Header,
  MonthSliderWrapper,
  Wrapper,
} from './EditReadingsHistoryModal.styled';
import { EditReadingsHistoryModalProps } from './EditReadingsHistoryModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';

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
    [readingDate],
  );

  const upMonth = useCallback(() => {
    if (isCanUp) {
      const date = moment(readingDate, ReadingDateFormat).add(1, 'month');
      setReadingDate(date.format(ReadingDateFormat));
    }
  }, [setReadingDate, readingDate, isCanUp]);

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
    <FormModal
      formId="edit-readings-history-modal"
      title="Ввод показаний за произвольный период"
      onCancel={handleCloseModal}
      submitBtnText="Сохранить показание"
      onSubmit={editReadings}
      visible={isOpen}
      form={
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
            <IndividualDeviceInfoExtended device={device} />
            <MetersInputsBlockPure
              resource={resource}
              rateNum={rateNum}
              bufferedReadingValues={readings}
              handleReadingInputChange={handleChangeReadingValues}
            />
          </Wrapper>
        </>
      }
    />
  );
};
