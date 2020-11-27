import axios from '../axios';
import { createTimeline, createTimer, createDevice } from './utils';

export async function getTasks(grouptype = null, searchState = {}) {
  try {
    const params = { grouptype };

    let query = 'tasks';
    if (searchState.searchTerm) {
      query += `/${searchState.searchTerm}`;
    }

    if (searchState.taskTypeNumber) {
      params.tasktype = searchState.taskTypeNumber;
    }

    const res = await axios.get(query, { params });

    return {
      ...res,
      items: res.items.map((item) => ({
        ...item,
        timeline: createTimeline(item),
        timer: createTimer(item),
        device: createDevice(item.device),
        calendar: new Date(item.creationTime ?? null).toLocaleString(),
        showExecutor: grouptype === 'observing',
      })),
    };
  } catch (error) {
    console.log(error);
  }
}
