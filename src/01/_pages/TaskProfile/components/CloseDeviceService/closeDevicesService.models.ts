import { $task } from "01/features/tasks/displayTask/models";

const $individualDevices = $task.map((task) => task?.individualDevices || [])

export const closeDeviceService = {
    outputs: {
        $individualDevices
    }
};
