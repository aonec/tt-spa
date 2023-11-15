import React, { FC, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { ApplicationInfoBlock } from './view/ApplicationInfoBlock';
import { ApplicationInfoContainerProps } from './applicationInfoService.types';
import { EHouseCategory } from 'api/types';
import { applicationInfoService } from './applicationInfoService.models';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { TextareaSC } from './view/ApplicationInfoBlock/ApplicationInfoBlock.styled';

const {
  outputs,
  gates: { PageGate },
  inputs,
} = applicationInfoService;

const formId = 'postpone-task';

export const ApplicationInfoContainer: FC<ApplicationInfoContainerProps> = ({
  task,
  isViewerExecutor,
}) => {
  const { applicationInfo, isLoading, isPostponeModalOpen, setModalOpen } =
    useUnit({
      applicationInfo: outputs.$applicationInfo,
      isLoading: outputs.$isLoading,
      isPostponeModalOpen: outputs.$isPostponeModalOpen,
      setModalOpen: inputs.setModalOpen,
    });
  const { address, apartment, houseCategory } = task;

  const apartmentId = apartment?.id;
  const buildingId = task.buildingId;

  const buildingProfilePath = useMemo(() => {
    if (houseCategory === EHouseCategory.Living) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [houseCategory]);

  const addressLinkPath = apartment
    ? `/apartments/${apartmentId}`
    : `/buildings/${buildingProfilePath}/${buildingId}`;

  return (
    <>
      <PageGate />
      <ApplicationInfoBlock
        applicationInfo={applicationInfo}
        addressLinkPath={addressLinkPath}
        address={address}
        isLoading={isLoading}
        isViewerExecutor={isViewerExecutor}
        isPostponeModalOpen={isPostponeModalOpen}
        setModalOpen={setModalOpen}
      />
      <FormModal
        title="Отложить задачу"
        submitBtnText="Отложить задачу"
        visible={isPostponeModalOpen}
        // loading={isLoading}
        onCancel={() => setModalOpen(false)}
        form={
          <Form id={formId} onSubmitCapture={() => setModalOpen(false)}>
            <FormItem label="Комментарий">
              <TextareaSC
                rows={4}
                placeholder="Опишите причину, по которой вы хотите отложить задачу"
                // autoSize
              />
            </FormItem>
          </Form>
        }
        formId={formId}
      />
    </>
  );
};
