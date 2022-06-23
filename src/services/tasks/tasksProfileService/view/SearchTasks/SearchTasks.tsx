import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { StyledInput } from '01/shared/ui/Fields';
import { Select } from 'antd';
import { useFormik } from 'formik';
import { EManagingFirmTaskFilterType } from 'myApi';
import React, { FC } from 'react';
import { SelectSC, Wrapper } from './SearchTasks.styled';
import { SearchTasksForm, SearchTasksProps } from './SearchTasks.types';
import { fromEnter } from '01/shared/ui/DatePickerNative';

export const SearchTasks: FC<SearchTasksProps> = ({ onSubmit, taskTypes }) => {
  const { values, handleSubmit, setFieldValue } = useFormik<SearchTasksForm>({
    initialValues: {
      TaskType: null,
      TaskId: undefined,
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
            value={values.TaskId}
            onKeyDown={fromEnter((e) => {
              e.currentTarget.blur();
              setFieldValue('TaskId', e.currentTarget.value);
              handleSubmit();
            })}
            onClick={(e) => {
              setFieldValue('TaskId', undefined);
              e.currentTarget.value = '';
            }}
          />
          <SelectSC
            placeholder="Тип задачи"
            value={values.TaskType!}
            onChange={(value) => {
              setFieldValue('TaskType', value as EManagingFirmTaskFilterType);
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
