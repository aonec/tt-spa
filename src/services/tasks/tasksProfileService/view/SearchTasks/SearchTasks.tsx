import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { StyledInput } from '01/shared/ui/Fields';
import { StyledSelect } from '01/shared/ui/Select/components';
import { Select } from 'antd';
import { useFormik } from 'formik';
import { EManagingFirmTaskFilterType } from 'myApi';
import React, { FC } from 'react';
import { SelectSC, Wrapper } from './SearchTasks.styled';
import {
  SeacrhTasksForm,
  SearchTasksProps,
  TasksFilterTypeDictionary,
} from './SearchTasks.types';

export const SearchTasks: FC<SearchTasksProps> = ({ onSubmit }) => {
  const { values, handleSubmit, setFieldValue } = useFormik<SeacrhTasksForm>({
    initialValues: {
      taskType: undefined,
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
            onChange={(e) => setFieldValue('taskId', e.currentTarget.value)}
            
          />
          <SelectSC
            placeholder="Тип задачи"
            value={values.taskType || undefined}
            onChange={(value) =>{
              setFieldValue('taskType', value as EManagingFirmTaskFilterType);
              handleSubmit();
            }
            }
            allowClear
          >
            {Object.values(EManagingFirmTaskFilterType)?.map((key) => (
              <Select.Option key={key} value={key}>
                {TasksFilterTypeDictionary[key]}
              </Select.Option>
            ))}
          </SelectSC>
        </Wrapper>
      </ExtendedSearch>
    </>
  );
};
