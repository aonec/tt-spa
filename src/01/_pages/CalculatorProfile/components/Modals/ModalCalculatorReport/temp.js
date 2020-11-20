// Все строки, разделенные по типам Ресурсов
// const selectOptions = devicesList.reduce((result, item) => {
//   const {
//     resource, serialNumber, entryNumber, pipeNumber, model,
//   } = item;
//   // console.log(item);
//   if (_.find(result, (o) => o.resource === resource && o.entryNumber === entryNumber) && (resource !== 'ColdWaterSupply')) {
//     const res = _.find(result, (o) => o.resource === resource && o.entryNumber === entryNumber);
//     // console.log('res', res);
//     const ind = result.indexOf(res);
//     result.splice(ind, 1, {
//       label: `${_.get(
//           result[ind],
//           'label',
//           'default',
//       )} ${model} (${serialNumber})`,
//       value: ind,
//       resource,
//       entryNumber,
//       pipeNumber,
//     });
//   } else {
//     result.push({
//       label: `Узел ${modelCalculator}: (${serialNumberCalculator}), ${model} (${serialNumber})`,
//       value: result.length,
//       entryNumber,
//       pipeNumber,
//       resource,
//     });
//   }
//   return result;
// }, []);


// Список всех ресурсов
// const resources = devicesList.reduce((result, item) => {
//   const { resource } = item;
//   if (!result.includes(resource)) {
//     result.push(resource);
//   }
//   return result;
// }, []);