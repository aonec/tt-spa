import React, { FC } from 'react';
import { SelectPersonalNumberActionModal } from './view/SelectPersonalNumberActionModal';
import { selectPersonalNumberActionService } from './selectPersonalNumberActionService.model';
import { useUnit } from 'effector-react';
import { SelectPersonalNumberActionContainerProps } from './selectPersonalNumberActionService.types';
import { ChoosePersonalNumberModal } from './view/ChoosePersonalNumberModal';

const { inputs, outputs } = selectPersonalNumberActionService;

export const SelectPersonalNumberActionContainer: FC<
  SelectPersonalNumberActionContainerProps
> = ({ apartment }) => {
  const {
    isChoosePersonalNumberModalOpen,
    isSelectActionModalOpen,
    selectedAction,
    setAction,
    setChoosePersonalNumberModalOpen,
    setSelectActionModalOpen,
  } = useUnit({
    setAction: inputs.setAction,
    setSelectActionModalOpen: inputs.setSelectActionModalOpen,
    setChoosePersonalNumberModalOpen: inputs.setChoosePersonalNumberModalOpen,
    isSelectActionModalOpen: outputs.$isSelectActionModalOpen,
    isChoosePersonalNumberModalOpen: outputs.$isChoosePersonalNumberModalOpen,
    selectedAction: outputs.$selectedAction,
  });

  return (
    <>
      <SelectPersonalNumberActionModal
        isOpen={isSelectActionModalOpen}
        setAction={setAction}
        apartmentId={apartment.id}
        setSelectActionModalOpen={setSelectActionModalOpen}
      />
      <ChoosePersonalNumberModal
        isOpen={isChoosePersonalNumberModalOpen}
        setIsOpen={setChoosePersonalNumberModalOpen}
        apartment={apartment}
        selectedAction={selectedAction}
        setSelectActionModalOpen={setSelectActionModalOpen}
      />
    </>
  );
};
