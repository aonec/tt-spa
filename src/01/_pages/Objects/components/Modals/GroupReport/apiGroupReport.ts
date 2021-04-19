import { getReport } from '../../../../CalculatorProfile/components/Modals/ModalCalculatorReport/apiCalculatorReport';

export function downloadReport(link: string, fileName: string) {
  getReport(link).then((response: any) => {
    debugger;
    // const url = window.URL.createObjectURL(new Blob([response]));
    // const link = document.createElement('a');
    // link.href = url;
    // const fileName = `Report.zip`;
    // link.setAttribute('download', fileName);
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
    const fileNameWithJunk = response.headers['content-disposition'].split(';');
    const encodedFileName = fileNameWithJunk[2].split("'")[2];
    const decodedFileName = decodeURI(encodedFileName).replace(/%2C/g, ',');
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', decodedFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}
