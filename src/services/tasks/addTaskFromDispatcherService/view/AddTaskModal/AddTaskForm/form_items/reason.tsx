import { FormItem } from 'ui-kit/FormItem';
import {
  ArrowRightLongIconDim,
  OptionItemWrapper,
  ResourseTypeWrapper,
  SelectExpandable,
  TopWrapper,
  WorkTitle,
  WorkTitleWrapper,
} from '../AddTaskForm.styled';
import { useCallback, useMemo } from 'react';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import { Select } from 'ui-kit/Select';
import { autocompleteReason } from '../AddTaskForm.utils';
import { ErpTaskReasonGroupResponse } from 'api/types';
import { TaskReasonTypeDictionary } from 'dictionaries';

export const Reason = ({
  value,
  setFieldValue,
  handleSelectTaskReason,
  handleSearchExecutor,
  setReasonOpen,
  isNoAdditionalFieldsRequired,
  isOnlySourceNumberRequired,
  isOnlySubscriberRequired,
  isSubscriberAndSourceNumberRequired,
  isReasonOpen,
  dataKey,
  handleClosePhoneNumber,
  searchValue,
  taskReasons,
}: {
  value: number | null;
  searchValue: string | null;
  handleSelectTaskReason: (name: string) => void;
  handleSearchExecutor: () => void;
  setReasonOpen: (value: boolean) => void;
  isNoAdditionalFieldsRequired: boolean;
  isOnlySourceNumberRequired: boolean;
  isOnlySubscriberRequired: boolean;
  isSubscriberAndSourceNumberRequired: boolean;
  isReasonOpen: boolean;
  dataKey: string;
  handleClosePhoneNumber: () => void;
  taskReasons: ErpTaskReasonGroupResponse[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any) => void;
}) => {
  const next = useSwitchInputOnEnter(dataKey, false, false);

  const onClear = useCallback(() => {
    setFieldValue('taskReasonSearch', null);
    setFieldValue('taskReasonOrderNumber', null);
  }, [setFieldValue]);

  const onSearch = useCallback(
    (value: string) => {
      setFieldValue('taskReasonSearch', value);
    },
    [setFieldValue],
  );

  const onSelect = useCallback(
    (value: unknown) => {
      const valueString = value as string;

      const name = valueString.split('_')[1];

      setFieldValue('taskReasonOrderNumber', valueString);
      setFieldValue('taskReasonSearch', name);
      setFieldValue('executorId', null);
      handleSelectTaskReason(name);

      handleSearchExecutor();

      setReasonOpen(false);
      if (isNoAdditionalFieldsRequired) {
        next(3);
      }
      if (isOnlySourceNumberRequired) {
        next(4);
      }
      if (isOnlySubscriberRequired) {
        next(5);
      }
      if (isSubscriberAndSourceNumberRequired) {
        next(6);
      }
    },
    [
      setFieldValue,
      handleSelectTaskReason,
      handleSearchExecutor,
      setReasonOpen,
      next,
      isNoAdditionalFieldsRequired,
      isOnlySourceNumberRequired,
      isOnlySubscriberRequired,
      isSubscriberAndSourceNumberRequired,
    ],
  );

  const onKeyDown = useCallback(() => {
    fromEnter(() => {
      if (isNoAdditionalFieldsRequired) {
        next(3);
      }
      if (isOnlySourceNumberRequired) {
        next(4);
      }
      if (isOnlySubscriberRequired) {
        next(5);
      }
      if (isSubscriberAndSourceNumberRequired) {
        next(6);
      }
    });
  }, [
    isNoAdditionalFieldsRequired,
    isOnlySourceNumberRequired,
    isOnlySubscriberRequired,
    isSubscriberAndSourceNumberRequired,
    next,
  ]);

  const onBlur = useCallback(() => {
    setReasonOpen(false);
  }, [setReasonOpen]);

  const onFocus = useCallback(() => {
    setReasonOpen(true);
    handleClosePhoneNumber();
  }, [setReasonOpen, handleClosePhoneNumber]);

  const onMouseDown = useCallback(() => {
    setReasonOpen(true);
  }, [setReasonOpen]);

  const taskReasonOptions = useMemo(
    () =>
      autocompleteReason(searchValue, taskReasons).map((taskReason) => {
        return (
          <Select.Option
            value={`${taskReason.orderNumber}_${taskReason.name}`}
            key={taskReason.orderNumber}
          >
            <OptionItemWrapper>
              <TopWrapper>
                <ResourseTypeWrapper>
                  {TaskReasonTypeDictionary[taskReason.type]}
                </ResourseTypeWrapper>
                <ArrowRightLongIconDim />
                <WorkTitleWrapper>
                  <WorkTitle>{taskReason.name}</WorkTitle>
                </WorkTitleWrapper>
              </TopWrapper>
            </OptionItemWrapper>
          </Select.Option>
        );
      }),
    [searchValue, taskReasons],
  );

  return (
    <FormItem label="Причина обращения">
      <SelectExpandable
        showSearch
        allowClear
        filterOption={false}
        virtual
        placeholder="Начните вводить"
        value={value}
        onClear={onClear}
        onSearch={onSearch}
        onSelect={onSelect}
        data-reading-input={dataKey}
        onKeyDown={onKeyDown}
        open={isReasonOpen}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseDown={onMouseDown}
      >
        {taskReasonOptions}
      </SelectExpandable>
    </FormItem>
  );
};
