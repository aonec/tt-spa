import { createStore, createEvent } from 'effector';
import { createForm } from 'effector-forms/dist';

export const $isSelectEditPersonalNumberTypeModalOpen = createStore(false);

export const openEditPersonalNumberTypeModal = createEvent();
export const closeEditPersonalNumberTypeModal = createEvent();

export const personalNumberEditForm = createForm({
    fields: {
        
    }
})