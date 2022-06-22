import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { StyledInput } from '01/shared/ui/Fields';
import { Select } from 'antd';
import { useFormik } from 'formik';
import { EManagingFirmTaskFilterType } from 'myApi';
import React, { FC } from 'react';
import { SelectSC, Wrapper } from './SearchTasks.styled';
import { SeacrhTasksForm, SearchTasksProps } from './SearchTasks.types';
import { fromEnter } from '01/shared/ui/DatePickerNative';

export const SearchTasks: FC<SearchTasksProps> = ({ onSubmit, taskTypes }) => {
  const { values, handleSubmit, setFieldValue } = useFormik<SeacrhTasksForm>({
    initialValues: {
      taskType: null,
      taskId: undefined,
    },
    onSubmit,
  });

  return (
    <>
      <ExtendedSearch
        isOpen={false}
        handleApply={() => {}}
        handleClear={() => {}}
        handleClose={() => {}}
        handleOpen={() => {}}
        extendedSearchContent={<></>}
      >
        <Wrapper>
          <StyledInput
            placeholder="Номер задачи"
            value={values.taskId}
            onKeyDown={(e) => {
              fromEnter(() => {
                e.currentTarget.blur();
                setFieldValue('taskId', e.currentTarget.value);
                handleSubmit();
              })(e);
            }}
            onClick={(e) => {
              setFieldValue('taskId', undefined);
              e.currentTarget.value = '';
            }}
          />
          <SelectSC
            placeholder="Тип задачи"
            value={values.taskType!}
            onChange={(value) => {
              setFieldValue('taskType', value as EManagingFirmTaskFilterType);
              handleSubmit();
            }}
          >
            {taskTypes &&
              taskTypes.map(({ value, key }) => (
                <Select.Option key={key!} value={key!}>
                  {value}
                </Select.Option>
              ))}
          </SelectSC>
        </Wrapper>
      </ExtendedSearch>
    </>
  );
};
