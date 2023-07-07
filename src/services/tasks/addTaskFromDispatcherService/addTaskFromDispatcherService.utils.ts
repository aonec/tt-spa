import { CreateErpTaskRequest, ObjectGrpcModel } from 'myApi';
import { AddTask } from './view/AddTaskModal/AddTaskForm/AddTaskForm.types';

export const prepareDataForCreateTask = (
  ErpObjects: ObjectGrpcModel[],
  data: AddTask,
): CreateErpTaskRequest => {
  const object = ErpObjects.find(
    (object) => object.address === data.selectedObjectAddress,
  );

  const sourceDateTime = data.requestDate
    ?.format('YYYY-MM-DD')
    .concat('T', data.requestTime || '');

  const manualTaskDeadline = data.manualDeadlineDate
    ?.format('YYYY-MM-DD')
    .concat('T', data.manualDeadlineTime || '');

  return {
    leadId: data.leadId || undefined,
    objectId: object?.id || undefined,
    sourceDateTime: sourceDateTime,
    sourceId: data.sourceId || undefined,
    sourceNumber: data.requestNumber,
    taskDescription: data.taskDescription,
    taskType: data.taskType || undefined,
    workCategoryId: data.workTypeId || undefined,
    subscriberFullName: data.subscriberName,
    subscriberPhoneNumber: data.phoneNumber,
    workerId: data.executorId || undefined,
    taskDeadline: data.taskDeadline || manualTaskDeadline,
  };
};
