import { useUnit } from 'effector-react';
import { exportTasksListService } from './exportTasksListService.models';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { tasksProfileService } from 'services/tasks/tasksProfileService';
import {
  tasksCountQuery,
  tasksExportQuery,
} from './exportTasksListService.api';
import { useEffect, useState } from 'react';
import { EManagingFirmTaskFilterType } from 'api/types';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { Card } from './exportTasksListService.styled';

const { inputs, outputs } = exportTasksListService;

export const ExportTasksListContainer = () => {
  const [tasksType, setTasksType] =
    useState<EManagingFirmTaskFilterType | null>(null);

  const {
    isOpen,
    closeModal,
    taskTypes,
    getTasksCountByType,
    isLoadingTasksCount,
    tasksCountData,
    handleExport,
    isLoadingExport,
  } = useUnit({
    isOpen: outputs.$isOpen,
    closeModal: inputs.closeModal,
    taskTypes: tasksProfileService.outputs.$taskTypes,
    tasksCountData: tasksCountQuery.$data,
    isLoadingTasksCount: tasksCountQuery.$pending,
    getTasksCountByType: tasksCountQuery.start,
    handleExport: tasksExportQuery.start,
    isLoadingExport: tasksExportQuery.$pending,
  });

  const count = tasksCountData?.totalItems || null;

  useEffect(() => {
    if (isOpen) return;

    tasksCountQuery.reset();
    setTasksType(null);
  }, [isOpen]);

  return (
    <FormModal
      title="Выгрузить список задач"
      formId="export-tasks-form"
      visible={isOpen}
      onCancel={() => {
        if (!tasksCountData) {
          closeModal();
          return;
        }

        tasksCountQuery.reset();
        setTasksType(null);
      }}
      submitBtnText={tasksCountData ? 'Выгрузить' : 'Продолжить'}
      loading={isLoadingTasksCount || isLoadingExport}
      onSubmit={() => {
        if (!tasksType) return;

        if (!tasksCountData) {
          getTasksCountByType({ TaskType: tasksType });
          return;
        }

        handleExport({ TaskType: tasksType });
      }}
      disabled={!tasksType}
      form={
        <>
          {!tasksCountData && (
            <>
              <FormItem label="Тип задачи">
                <Select
                  placeholder="Выберите"
                  value={tasksType}
                  onChange={(type) =>
                    setTasksType(type as EManagingFirmTaskFilterType)
                  }
                >
                  {taskTypes
                    ?.filter((elem) => elem.key)
                    ?.map((elem) => (
                      <Select.Option key={elem.key} value={elem.key}>
                        {elem.value}
                      </Select.Option>
                    ))}
                </Select>
              </FormItem>
            </>
          )}
          {tasksCountData && (
            <Card>
              <CommonInfo
                items={[
                  {
                    key: 'Тип задач',
                    value: taskTypes?.find((elem) => elem.key === tasksType)
                      ?.value,
                  },
                  {
                    key: 'Количество задач',
                    value: count,
                  },
                ]}
              />
            </Card>
          )}
        </>
      }
    />
  );
};
