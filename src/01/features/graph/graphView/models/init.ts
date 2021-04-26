import { $graphData, setDataToStore } from './index';

$graphData.on(setDataToStore, (s, a) => a);
