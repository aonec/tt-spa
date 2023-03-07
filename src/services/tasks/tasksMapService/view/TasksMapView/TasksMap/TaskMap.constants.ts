import { EActResourceType, EResourceType } from 'myApi';

export const EXTENDED_PLACEMARK_ZOOM_LIMIT = 18;

export const ResourcesPlacemarksLookup: {
  [key: string]: string;
} = {
  [EActResourceType.All]: `<path d="M31.5 16.5C31.5 18.6568 30.5452 21.4275 29.0526 24.418C27.5678 27.393 25.5828 30.5235 23.5899 33.3813C21.5982 36.2372 19.6056 38.811 18.1103 40.6714C17.3628 41.6013 16.7402 42.3523 16.3047 42.8704C16.1897 43.0073 16.0877 43.1279 16 43.2313C15.9123 43.1279 15.8103 43.0073 15.6953 42.8704C15.2598 42.3523 14.6372 41.6013 13.8897 40.6714C12.3944 38.811 10.4018 36.2372 8.41012 33.3813C6.41725 30.5235 4.43224 27.393 2.94737 24.418C1.45477 21.4275 0.5 18.6568 0.5 16.5C0.5 7.64883 7.45398 0.5 16 0.5C24.546 0.5 31.5 7.64883 31.5 16.5Z" fill="#28305C" stroke="white"/>
<circle cx="16" cy="12.5" r="3.5" fill="#E2B104"/>
<circle cx="12" cy="20" r="3.5" fill="#79AFFF"/>
<circle cx="20" cy="20" r="3.5" fill="#FF8C68"/>`,
  [EResourceType.ColdWaterSupply]: `<path d="M31.5 16.5C31.5 18.6568 30.5452 21.4275 29.0526 24.418C27.5678 27.393 25.5828 30.5235 23.5899 33.3813C21.5982 36.2372 19.6056 38.811 18.1103 40.6714C17.3628 41.6013 16.7402 42.3523 16.3047 42.8704C16.1897 43.0073 16.0877 43.1279 16 43.2313C15.9123 43.1279 15.8103 43.0073 15.6953 42.8704C15.2598 42.3523 14.6372 41.6013 13.8897 40.6714C12.3944 38.811 10.4018 36.2372 8.41012 33.3813C6.41725 30.5235 4.43224 27.393 2.94737 24.418C1.45477 21.4275 0.5 18.6568 0.5 16.5C0.5 7.64883 7.45398 0.5 16 0.5C24.546 0.5 31.5 7.64883 31.5 16.5Z" fill="#79AFFF" stroke="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20C20 22.2091 18.2091 24 16 24C13.7909 24 12 22.2091 12 20C12 18.8939 12.5141 17.4636 13.5193 15.957C14.1703 14.9815 15.0022 14.0123 15.9644 13.1274C16.0362 13.486 16.1462 13.8247 16.2885 14.1465C16.6919 15.0588 17.3303 15.7749 17.899 16.3752C17.9814 16.4622 18.0624 16.5471 18.1416 16.6302L18.1417 16.6303C19.2243 17.7657 20 18.5792 20 20ZM11 20C11 17.545 12.976 14.3176 15.8739 11.8749C16.2356 11.57 16.6116 11.2774 17 11C16.8901 11.4945 16.8527 11.9408 16.8731 12.3486C16.9532 13.9474 17.9223 14.9568 18.9012 15.9765C19.945 17.0638 21 18.1626 21 20C21 22.7614 18.7614 25 16 25C13.2386 25 11 22.7614 11 20ZM14 19.5C14 19.2239 13.7761 19 13.5 19C13.2239 19 13 19.2239 13 19.5C13 21.7761 14.7239 23 16 23C16.2761 23 16.5 22.7761 16.5 22.5C16.5 22.2239 16.2761 22 16 22C15.2761 22 14 21.2239 14 19.5Z" fill="white"/>
`,
  [EResourceType.Electricity]: `<path d="M31.5 16.5C31.5 18.6568 30.5452 21.4275 29.0526 24.418C27.5678 27.393 25.5828 30.5235 23.5899 33.3813C21.5982 36.2372 19.6056 38.811 18.1103 40.6714C17.3628 41.6013 16.7402 42.3523 16.3047 42.8704C16.1897 43.0073 16.0877 43.1279 16 43.2313C15.9123 43.1279 15.8103 43.0073 15.6953 42.8704C15.2598 42.3523 14.6372 41.6013 13.8897 40.6714C12.3944 38.811 10.4018 36.2372 8.41012 33.3813C6.41725 30.5235 4.43224 27.393 2.94737 24.418C1.45477 21.4275 0.5 18.6568 0.5 16.5C0.5 7.64883 7.45398 0.5 16 0.5C24.546 0.5 31.5 7.64883 31.5 16.5Z" fill="#E2B104" stroke="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.015 11H21.0403L17.0403 16H22L15 25H13.9597L15.3596 19H10L14.015 11ZM15 12L12 18H17L16 22L19.5 17H14.9597L18.5 12H15Z" fill="white"/>
`,
  [EResourceType.Heat]: `<path d="M31.5 16.5C31.5 18.6568 30.5452 21.4275 29.0526 24.418C27.5678 27.393 25.5828 30.5235 23.5899 33.3813C21.5982 36.2372 19.6056 38.811 18.1103 40.6714C17.3628 41.6013 16.7402 42.3523 16.3047 42.8704C16.1897 43.0073 16.0877 43.1279 16 43.2313C15.9123 43.1279 15.8103 43.0073 15.6953 42.8704C15.2598 42.3523 14.6372 41.6013 13.8897 40.6714C12.3944 38.811 10.4018 36.2372 8.41012 33.3813C6.41725 30.5235 4.43224 27.393 2.94737 24.418C1.45477 21.4275 0.5 18.6568 0.5 16.5C0.5 7.64883 7.45398 0.5 16 0.5C24.546 0.5 31.5 7.64883 31.5 16.5Z" fill="#A269E9" stroke="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 14C11.5523 14 12 14.4477 12 15V21C12 21.5523 11.5523 22 11 22C10.4477 22 10 21.5523 10 21V20V16V15C10 14.4477 10.4477 14 11 14ZM9 20V16H8V15H9C9 13.8954 9.89542 13 11 13C11.5974 13 12.1335 13.2619 12.5 13.6771C12.8665 13.2619 13.4026 13 14 13C14.5974 13 15.1335 13.2619 15.5 13.6771C15.8665 13.2619 16.4026 13 17 13C17.5974 13 18.1335 13.2619 18.5 13.6771C18.8665 13.2619 19.4026 13 20 13C21.1046 13 22 13.8954 22 15H22.5C23.3284 15 24 15.6716 24 16.5V18H23V16.5C23 16.2239 22.7762 16 22.5 16H22V20H24V21H22C22 22.1046 21.1046 23 20 23C19.4026 23 18.8665 22.7381 18.5 22.3229C18.1335 22.7381 17.5974 23 17 23C16.4026 23 15.8665 22.7381 15.5 22.3229C15.1335 22.7381 14.5974 23 14 23C13.4026 23 12.8665 22.7381 12.5 22.3229C12.1335 22.7381 11.5974 23 11 23C9.89542 23 9 22.1046 9 21H8V20H9ZM18 21V15C18 14.4477 17.5523 14 17 14C16.4477 14 16 14.4477 16 15V21C16 21.5523 16.4477 22 17 22C17.5523 22 18 21.5523 18 21ZM19 15V21C19 21.5523 19.4477 22 20 22C20.5523 22 21 21.5523 21 21V15C21 14.4477 20.5523 14 20 14C19.4477 14 19 14.4477 19 15ZM14 14C14.5523 14 15 14.4477 15 15V21C15 21.5523 14.5523 22 14 22C13.4477 22 13 21.5523 13 21V15C13 14.4477 13.4477 14 14 14Z" fill="white"/>
`,
  [EResourceType.HotWaterSupply]: `<path d="M31.5 16.5C31.5 18.6568 30.5452 21.4275 29.0526 24.418C27.5678 27.393 25.5828 30.5235 23.5899 33.3813C21.5982 36.2372 19.6056 38.811 18.1103 40.6714C17.3628 41.6013 16.7402 42.3523 16.3047 42.8704C16.1897 43.0073 16.0877 43.1279 16 43.2313C15.9123 43.1279 15.8103 43.0073 15.6953 42.8704C15.2598 42.3523 14.6372 41.6013 13.8897 40.6714C12.3944 38.811 10.4018 36.2372 8.41012 33.3813C6.41725 30.5235 4.43224 27.393 2.94737 24.418C1.45477 21.4275 0.5 18.6568 0.5 16.5C0.5 7.64883 7.45398 0.5 16 0.5C24.546 0.5 31.5 7.64883 31.5 16.5Z" fill="#FF8C68" stroke="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20C20 22.2091 18.2091 24 16 24C13.7909 24 12 22.2091 12 20C12 18.8939 12.5141 17.4636 13.5193 15.957C14.1703 14.9815 15.0022 14.0123 15.9644 13.1274C16.0362 13.486 16.1462 13.8247 16.2885 14.1465C16.6919 15.0588 17.3303 15.7749 17.899 16.3752C17.9814 16.4622 18.0624 16.5471 18.1416 16.6302L18.1417 16.6303C19.2243 17.7657 20 18.5792 20 20ZM11 20C11 17.545 12.976 14.3176 15.8739 11.8749C16.2356 11.57 16.6116 11.2774 17 11C16.8901 11.4945 16.8527 11.9408 16.8731 12.3486C16.9532 13.9474 17.9223 14.9568 18.9012 15.9765C19.945 17.0638 21 18.1626 21 20C21 22.7614 18.7614 25 16 25C13.2386 25 11 22.7614 11 20ZM14 19.5C14 19.2239 13.7761 19 13.5 19C13.2239 19 13 19.2239 13 19.5C13 21.7761 14.7239 23 16 23C16.2761 23 16.5 22.7761 16.5 22.5C16.5 22.2239 16.2761 22 16 22C15.2761 22 14 21.2239 14 19.5Z" fill="white"/>
`,
};

export const CalculatorPlacemark = `
  <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.5 16.5C31.5 18.6568 30.5452 21.4275 29.0526 24.418C27.5678 27.393 25.5828 30.5235 23.5899 33.3813C21.5982 36.2372 19.6056 38.811 18.1103 40.6714C17.3628 41.6013 16.7402 42.3523 16.3047 42.8704C16.1897 43.0073 16.0877 43.1279 16 43.2313C15.9123 43.1279 15.8103 43.0073 15.6953 42.8704C15.2598 42.3523 14.6372 41.6013 13.8897 40.6714C12.3944 38.811 10.4018 36.2372 8.41012 33.3813C6.41725 30.5235 4.43224 27.393 2.94737 24.418C1.45477 21.4275 0.5 18.6568 0.5 16.5C0.5 7.64883 7.45398 0.5 16 0.5C24.546 0.5 31.5 7.64883 31.5 16.5Z" fill="#28305C" stroke="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 13H10V21H22V13ZM10 12C9.44772 12 9 12.4477 9 13V21C9 21.5523 9.44772 22 10 22H22C22.5523 22 23 21.5523 23 21V13C23 12.4477 22.5523 12 22 12H10ZM20 14H12V17H20V14ZM19 15H13V16H19V15ZM13 18H14V19H13V18ZM15 18H16H17V19H16H15V18ZM18 18H19V19H18V18Z" fill="white"/>
</svg>
`;

export const ExtenedTaskPanelBySizeDictionary: {
  [key: number]: { layout: string; width: number };
} = {
  2: {
    layout: `<path d="M49.0057 62.9546L45.3886 53.6191C48.2823 48.1706 51.5411 51.3489 52.8088 53.6191L49.0057 62.9546Z" fill="#28305C" stroke="white"/>
      <rect x="1.38568" y="0.948914" width="91.9596" height="52.1068" rx="17.5" fill="#28305C" stroke="white"/>
      <path d="M49.0057 61.6251L45.3886 52.2896C48.2823 46.8412 51.5411 50.0194 52.8088 52.2896L49.0057 61.6251Z" fill="#28305C"/>
    `,
    width: 93,
  },
  3: {
    layout: `<path d="M63.9014 62.6989L60.2844 53.3634C63.178 47.9149 66.4368 51.0932 67.7045 53.3634L63.9014 62.6989Z" fill="#28305C" stroke="white"/>
      <rect x="1.38568" y="0.968811" width="123.953" height="52.1068" rx="17.5" fill="#28305C" stroke="white"/>
      <path d="M63.9014 61.3694L60.2844 52.034C63.178 46.5855 66.4368 49.7638 67.7045 52.034L63.9014 61.3694Z" fill="#28305C"/>
    `,
    width: 125,
  },
  4: {
    layout: `<path d="M80.8776 63.0478L77.2606 53.7124C80.1542 48.2639 83.413 51.4422 84.6807 53.7124L80.8776 63.0478Z" fill="#28305C" stroke="white"/>
      <rect x="0.540955" y="1.34119" width="158.757" height="52.1068" rx="17.5" fill="#28305C" stroke="white"/>
      <path d="M80.8776 61.7184L77.2606 52.3829C80.1542 46.9344 83.413 50.1127 84.6807 52.3829L80.8776 61.7184Z" fill="#28305C"/>
    `,
    width: 160,
  },
  5: {
    layout: `<path d="M96.1774 62.4692L92.5604 53.1337C95.454 47.6852 98.7128 50.8635 99.9805 53.1337L96.1774 62.4692Z" fill="#28305C" stroke="white"/>
      <rect x="1.49786" y="0.811462" width="188.459" height="52.1068" rx="17.5" fill="#28305C" stroke="white"/>
      <path d="M96.1774 61.1397L92.5604 51.8042C95.454 46.3557 98.7128 49.534 99.9805 51.8042L96.1774 61.1397Z" fill="#28305C"/>
    `,
    width: 190,
  },
  6: {
    layout: `<path d="M111.643 62.4634L108.026 53.1279C110.92 47.6794 114.179 50.8577 115.447 53.1279L111.643 62.4634Z" fill="#28305C" stroke="white"/>
      <rect x="1.04083" y="1.15372" width="217.575" height="52.1068" rx="17.5" fill="#28305C" stroke="white"/>
      <path d="M111.643 61.1339L108.026 51.7985C110.92 46.35 114.179 49.5283 115.447 51.7985L111.643 61.1339Z" fill="#28305C"/>
    `,
    width: 219,
  },
};
