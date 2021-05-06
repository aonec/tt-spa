import { $graphData, setDataToStore } from './index';

$graphData.on(setDataToStore, (_, payload) => payload);
