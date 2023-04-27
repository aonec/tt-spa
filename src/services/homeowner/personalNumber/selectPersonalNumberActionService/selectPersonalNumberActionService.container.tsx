import React, { FC } from 'react';
import { SelectPersonalNumberActionModal } from './view/SelectPersonalNumberActionModal';
import { selectPersonalNumberActionService } from './selectPersonalNumberActionService.model';
import { useEvent, useStore } from 'effector-react';
import { SelectPersonalNumberActionContainerProps } from './selectPersonalNumberActionService.types';
import { ChoosePersonalNumberModal } from './view/ChoosePersonalNumberModal';

const { inputs, outputs } = selectPersonalNumberActionService;

export const SelectPersonalNumberActionContainer: FC<
  SelectPersonalNumberActionContainerProps
> = ({ apartment }) => {
  const setAction = useEvent(inputs.setAction);

  const isSelectActionModalOpen = useStore(outputs.$isSelectActionModalOpen);
  const isChoosePersonalNumberModalOpen = useStore(
    outputs.$isChoosePersonalNumberModalOpen,
  );

  return (
    <>
      <SelectPersonalNumberActionModal
        isOpen={isSelectActionModalOpen}
        setAction={setAction}
      />
      <ChoosePersonalNumberModal
        isOpen={isChoosePersonalNumberModalOpen}
        apartment={apartment}
      />
    </>
  );
};
