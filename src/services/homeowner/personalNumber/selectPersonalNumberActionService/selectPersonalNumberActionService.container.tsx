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

  const setChoosePersonalNumberModalOpen = useEvent(
    inputs.setChoosePersonalNumberModalOpen,
  );

  const isSelectActionModalOpen = useStore(outputs.$isSelectActionModalOpen);
  const isChoosePersonalNumberModalOpen = useStore(
    outputs.$isChoosePersonalNumberModalOpen,
  );
  const selectedAction = useStore(outputs.$selectedAction);

  return (
    <>
      <SelectPersonalNumberActionModal
        isOpen={isSelectActionModalOpen}
        setAction={setAction}
      />
      <ChoosePersonalNumberModal
        isOpen={isChoosePersonalNumberModalOpen}
        setIsOpen={setChoosePersonalNumberModalOpen}
        apartment={apartment}
        selectedAction={selectedAction}
      />
    </>
  );
};
