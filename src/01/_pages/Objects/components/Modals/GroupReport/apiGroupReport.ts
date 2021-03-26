import { getArchive } from '../../../../CalculatorProfile/components/Modals/ModalCalculatorReport/apiCalculatorReport';

export function downloadReport(link: string, fileName: string) {
  getArchive(link).then((response: any) => {
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    const fileName = `Report.zip`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}
