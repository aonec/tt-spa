import React, { FC } from 'react';
import { SelectPersonalNumberActionModal } from './view/SelectPersonalNumberActionModal';
import { selectPersonalNumberActionService } from './selectPersonalNumberActionService.model';
import { useEvent, useStore } from 'effector-react';
import { SelectPersonalNumberActionContainerProps } from './selectPersonalNumberActionService.types';

const { inputs, outputs } = selectPersonalNumberActionService;

export const SelectPersonalNumberActionContainer: FC<
  SelectPersonalNumberActionContainerProps
> = ({ apartment }) => {
  const setSelectActionModalOpen = useEvent(inputs.setSelectActionModalOpen);

  const isSelectActionModalOpen = useStore(outputs.isSelectActionModalOpen);

  return (
    <>
      <SelectPersonalNumberActionModal
        setOpen={setSelectActionModalOpen}
        isOpen={isSelectActionModalOpen}
      />
    </>
  );
};
