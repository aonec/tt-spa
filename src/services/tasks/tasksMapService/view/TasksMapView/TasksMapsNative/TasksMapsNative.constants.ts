import { EActResourceType, EResourceType } from 'myApi';
import { HousingStockTaskMarkerType } from './TasksMapsNative.types';

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

export const ApplicationTaskPlacemark = `
 <svg width="33" height="45" viewBox="0 0 33 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.7669 17.3534C31.7669 19.5102 30.8121 22.281 29.3195 25.2714C27.8347 28.2464 25.8497 31.3769 23.8568 34.2347C21.8651 37.0906 19.8725 39.6645 18.3772 41.5248C17.6298 42.4547 17.0071 43.2057 16.5716 43.7239C16.4566 43.8607 16.3546 43.9813 16.2669 44.0847C16.1792 43.9813 16.0772 43.8607 15.9622 43.7239C15.5267 43.2057 14.9041 42.4547 14.1566 41.5248C12.6613 39.6645 10.6687 37.0906 8.67703 34.2347C6.68416 31.3769 4.69914 28.2464 3.21428 25.2714C1.72168 22.281 0.766907 19.5102 0.766907 17.3534C0.766907 8.50225 7.72088 1.35342 16.2669 1.35342C24.8129 1.35342 31.7669 8.50225 31.7669 17.3534Z" fill="#28305C" stroke="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.5247 21.0612L16.2669 10.5612L10.009 21.0612L22.5247 21.0612ZM17.1609 10.0612C16.7635 9.39449 15.7702 9.39449 15.3729 10.0612L9.11506 20.5612C8.71774 21.2278 9.21439 22.0612 10.009 22.0612H22.5247C23.3194 22.0612 23.816 21.2278 23.4187 20.5612L17.1609 10.0612ZM16.2669 13.207C16.5545 13.207 16.7877 13.4402 16.7877 13.7278V17.3737C16.7877 17.6613 16.5545 17.8945 16.2669 17.8945C15.9792 17.8945 15.7461 17.6613 15.7461 17.3737V13.7278C15.7461 13.4402 15.9792 13.207 16.2669 13.207ZM16.2669 19.9778C16.5545 19.9778 16.7877 19.7446 16.7877 19.457C16.7877 19.1693 16.5545 18.9362 16.2669 18.9362C15.9792 18.9362 15.7461 19.1693 15.7461 19.457C15.7461 19.7446 15.9792 19.9778 16.2669 19.9778Z" fill="white"/>
</svg>

`;

export const ExtenedTaskPanelBySizeDictionary: {
  [key: number]: { layout: string; width: number };
} = {
  2: {
    layout: `
      <path d="M49.0057 62.9546L45.3886 53.6191C48.2823 48.1706 51.5411 51.3489 52.8088 53.6191L49.0057 62.9546Z" fill="#28305C" stroke="white"/>
      <rect x="1.38568" y="0.948914" width="91.9596" height="52.1068" rx="17.5" fill="#28305C" stroke="white"/>
      <path d="M49.0057 61.6251L45.3886 52.2896C48.2823 46.8412 51.5411 50.0194 52.8088 52.2896L49.0057 61.6251Z" fill="#28305C"/>
    `,
    width: 93,
  },
  3: {
    layout: `
      <path d="M63.9014 62.6989L60.2844 53.3634C63.178 47.9149 66.4368 51.0932 67.7045 53.3634L63.9014 62.6989Z" fill="#28305C" stroke="white"/>
      <rect x="1.38568" y="0.968811" width="123.953" height="52.1068" rx="17.5" fill="#28305C" stroke="white"/>
      <path d="M63.9014 61.3694L60.2844 52.034C63.178 46.5855 66.4368 49.7638 67.7045 52.034L63.9014 61.3694Z" fill="#28305C"/>
    `,
    width: 125,
  },
  4: {
    layout: `
      <path d="M80.8776 63.0478L77.2606 53.7124C80.1542 48.2639 83.413 51.4422 84.6807 53.7124L80.8776 63.0478Z" fill="#28305C" stroke="white"/>
      <rect x="0.540955" y="1.34119" width="158.757" height="52.1068" rx="17.5" fill="#28305C" stroke="white"/>
      <path d="M80.8776 61.7184L77.2606 52.3829C80.1542 46.9344 83.413 50.1127 84.6807 52.3829L80.8776 61.7184Z" fill="#28305C"/>
    `,
    width: 160,
  },
  5: {
    layout: `
      <path d="M96.1774 62.4692L92.5604 53.1337C95.454 47.6852 98.7128 50.8635 99.9805 53.1337L96.1774 62.4692Z" fill="#28305C" stroke="white"/>
      <rect x="1.49786" y="0.811462" width="188.459" height="52.1068" rx="17.5" fill="#28305C" stroke="white"/>
      <path d="M96.1774 61.1397L92.5604 51.8042C95.454 46.3557 98.7128 49.534 99.9805 51.8042L96.1774 61.1397Z" fill="#28305C"/>
    `,
    width: 190,
  },
  6: {
    layout: `
      <path d="M111.643 62.4634L108.026 53.1279C110.92 47.6794 114.179 50.8577 115.447 53.1279L111.643 62.4634Z" fill="#28305C" stroke="white"/>
      <rect x="1.04083" y="1.15372" width="217.575" height="52.1068" rx="17.5" fill="#28305C" stroke="white"/>
      <path d="M111.643 61.1339L108.026 51.7985C110.92 46.35 114.179 49.5283 115.447 51.7985L111.643 61.1339Z" fill="#28305C"/>
    `,
    width: 219,
  },
};

export const getCountCircle = (x: number, count: number) => {
  const xCountOffset = String(count).length === 2 ? 2.5 : -0.5;

  return `
     <path transform="translate(${
       x - 16 + xCountOffset
     }, 12)" d="M22.3147 8.5C22.3147 4.35786 25.6726 1 29.8147 1V1C33.9569 1 37.3147 4.35786 37.3147 8.5V8.5C37.3147 12.6421 33.9569 16 29.8147 16V16C25.6726 16 22.3147 12.6421 22.3147 8.5V8.5Z" fill="#272F5A" stroke="white"/>
    <text x="${
      x + 11
    }" y="23" font-family="PTRootUIWeb" fill="white" style="font: 9px sans-serif;">${count}</text>      
  `;
};

export const TaskTypePlacemarkIconsDictionary: {
  [key: string]: (x: number, y: number) => string;
} = {
  [HousingStockTaskMarkerType.AllResources]: (x, y) => `
    <circle transform="translate(${x - 4}, ${
    y - 1
  })" cx="10.0784" cy="5.19251" r="4.46552" fill="#E2B104"/>
    <circle transform="translate(${x - 4}, ${
    y - 1
  })" cx="4.97486" cy="14.7615" r="4.46552" fill="#79AFFF"/>
    <circle transform="translate(${x - 4}, ${
    y - 1
  })" cx="15.1817" cy="14.7615" r="4.46552" fill="#FF8C68"/>
  `,
  [HousingStockTaskMarkerType.Calculator]: (x, y) => `
    <path transform="translate(${x}, ${y})"  fill-rule="evenodd" clip-rule="evenodd" d="M17.6147 1.50029H2.01466V11.9003H17.6147V1.50029ZM2.01466 0.200287C1.29669 0.200287 0.714661 0.782317 0.714661 1.50029V11.9003C0.714661 12.6183 1.29669 13.2003 2.01466 13.2003H17.6147C18.3326 13.2003 18.9147 12.6183 18.9147 11.9003V1.50029C18.9147 0.782317 18.3326 0.200287 17.6147 0.200287H2.01466ZM15.0147 2.80029H4.61466V6.70029H15.0147V2.80029ZM13.7147 4.10029H5.91466V5.40029H13.7147V4.10029ZM5.91466 8.00029H7.21466V9.30029H5.91466V8.00029ZM8.51466 8.00029H9.81466H11.1147V9.30029H9.81466H8.51466V8.00029ZM12.4147 8.00029H13.7147V9.30029H12.4147V8.00029Z" fill="white"/>
  `,
  [HousingStockTaskMarkerType.Heat]: (x, y) => `
    <path transform="translate(${x}, ${y})" fill-rule="evenodd" clip-rule="evenodd" d="M4.31235 1.50029C5.03031 1.50029 5.61235 2.08232 5.61235 2.80029V10.6003C5.61235 11.3183 5.03031 11.9003 4.31235 11.9003C3.59439 11.9003 3.01235 11.3183 3.01235 10.6003V9.30029V4.10029V2.80029C3.01235 2.08232 3.59439 1.50029 4.31235 1.50029ZM1.71235 9.30029V4.10029H0.412354V2.80029H1.71235C1.71235 1.36435 2.87639 0.200287 4.31235 0.200287C5.08891 0.200287 5.78596 0.54073 6.26235 1.0805C6.73875 0.54073 7.4358 0.200287 8.21235 0.200287C8.98891 0.200287 9.68596 0.54073 10.1624 1.0805C10.6387 0.54073 11.3358 0.200287 12.1124 0.200287C12.8889 0.200287 13.586 0.54073 14.0624 1.0805C14.5387 0.54073 15.2358 0.200287 16.0124 0.200287C17.4483 0.200287 18.6124 1.36435 18.6124 2.80029H19.2624C20.3393 2.80029 21.2124 3.67333 21.2124 4.75029V6.70029H19.9124V4.75029C19.9124 4.3913 19.6214 4.10029 19.2624 4.10029H18.6124V9.30029H21.2124V10.6003H18.6124C18.6124 12.0362 17.4483 13.2003 16.0124 13.2003C15.2358 13.2003 14.5387 12.8598 14.0624 12.3201C13.586 12.8598 12.8889 13.2003 12.1124 13.2003C11.3358 13.2003 10.6387 12.8598 10.1624 12.3201C9.68596 12.8598 8.98891 13.2003 8.21235 13.2003C7.4358 13.2003 6.73875 12.8598 6.26235 12.3201C5.78596 12.8598 5.08891 13.2003 4.31235 13.2003C2.87639 13.2003 1.71235 12.0362 1.71235 10.6003H0.412354V9.30029H1.71235ZM13.4124 10.6003V2.80029C13.4124 2.08232 12.8303 1.50029 12.1124 1.50029C11.3944 1.50029 10.8124 2.08232 10.8124 2.80029V10.6003C10.8124 11.3183 11.3944 11.9003 12.1124 11.9003C12.8303 11.9003 13.4124 11.3183 13.4124 10.6003ZM14.7124 2.80029V10.6003C14.7124 11.3183 15.2944 11.9003 16.0124 11.9003C16.7303 11.9003 17.3124 11.3183 17.3124 10.6003V2.80029C17.3124 2.08232 16.7303 1.50029 16.0124 1.50029C15.2944 1.50029 14.7124 2.08232 14.7124 2.80029ZM8.21235 1.50029C8.93031 1.50029 9.51235 2.08232 9.51235 2.80029V10.6003C9.51235 11.3183 8.93031 11.9003 8.21235 11.9003C7.49439 11.9003 6.91235 11.3183 6.91235 10.6003V2.80029C6.91235 2.08232 7.49439 1.50029 8.21235 1.50029Z" fill="#A269E9"/>
  `,
  [HousingStockTaskMarkerType.ColdWaterSupply]: (x, y) => `
    <path transform="translate(${x}, ${y})" fill-rule="evenodd" clip-rule="evenodd" d="M0.675354 11.3882C0.675354 8.31941 3.14533 4.28522 6.76774 1.23183C7.21985 0.850744 7.68991 0.484932 8.17535 0.138184C8.03798 0.756353 7.99119 1.31413 8.01673 1.82397C8.11684 3.82239 9.32822 5.08421 10.5518 6.35876C11.8566 7.71787 13.1754 9.09148 13.1754 11.3882C13.1754 14.84 10.3771 17.6382 6.92535 17.6382C3.47357 17.6382 0.675354 14.84 0.675354 11.3882Z" fill="#79AFFF"/>
    <path transform="translate(${x}, ${y})" fill-rule="evenodd" clip-rule="evenodd" d="M4.42535 10.7632C4.42535 10.418 4.14553 10.1382 3.80035 10.1382C3.45518 10.1382 3.17535 10.418 3.17535 10.7632C3.17535 13.6084 5.33018 15.1382 6.92535 15.1382C7.27053 15.1382 7.55035 14.8584 7.55035 14.5132C7.55035 14.168 7.27053 13.8882 6.92535 13.8882C6.02053 13.8882 4.42535 12.918 4.42535 10.7632Z" fill="white"/>
  `,
  [HousingStockTaskMarkerType.HotWaterSupply]: (x, y) => `
    <path transform="translate(${x}, ${y})" fill-rule="evenodd" clip-rule="evenodd" d="M0.0910645 11.3882C0.0910645 8.31941 2.56104 4.28522 6.18345 1.23183C6.63556 0.850744 7.10562 0.484932 7.59106 0.138184C7.45369 0.756353 7.4069 1.31413 7.43244 1.82397C7.53255 3.82239 8.74393 5.08421 9.96755 6.35876C11.2724 7.71787 12.5911 9.09148 12.5911 11.3882C12.5911 14.84 9.79284 17.6382 6.34106 17.6382C2.88928 17.6382 0.0910645 14.84 0.0910645 11.3882Z" fill="#FF8C68"/>
    <path transform="translate(${x}, ${y})" fill-rule="evenodd" clip-rule="evenodd" d="M3.84106 10.7632C3.84106 10.418 3.56124 10.1382 3.21606 10.1382C2.87089 10.1382 2.59106 10.418 2.59106 10.7632C2.59106 13.6084 4.74589 15.1382 6.34106 15.1382C6.68624 15.1382 6.96606 14.8584 6.96606 14.5132C6.96606 14.168 6.68624 13.8882 6.34106 13.8882C5.43624 13.8882 3.84106 12.918 3.84106 10.7632Z" fill="white"/>
  `,
  [HousingStockTaskMarkerType.Electricity]: (x, y) => `
    <path transform="translate(${x}, ${
    y + 1
  })" fill-rule="evenodd" clip-rule="evenodd" d="M6.00893 0.138184H14.7906L9.79066 6.38818H15.9902L7.24023 17.6382H5.93988L7.68979 10.1382H0.990234L6.00893 0.138184Z" fill="#E2B104"/>
  `,
  [HousingStockTaskMarkerType.Application]: (x, y) => `
    <path transform="translate(${x}, ${
    y + 1
  })" fill-rule="evenodd" clip-rule="evenodd" d="M17.6646 14.4557L9.90483 1.43568L2.14509 14.4557L17.6646 14.4557ZM11.0134 0.815679C10.5207 -0.0109874 9.28898 -0.0109885 8.79629 0.815678L1.03656 13.8357C0.543878 14.6623 1.15973 15.6957 2.14509 15.6957H17.6646C18.6499 15.6957 19.2658 14.6623 18.7731 13.8357L11.0134 0.815679ZM9.90483 4.71651C10.2615 4.71651 10.5507 5.00566 10.5507 5.36235V9.88318C10.5507 10.2399 10.2615 10.529 9.90483 10.529C9.54814 10.529 9.25899 10.2399 9.25899 9.88318V5.36235C9.25899 5.00566 9.54814 4.71651 9.90483 4.71651ZM9.90483 13.1123C10.2615 13.1123 10.5507 12.8232 10.5507 12.4665C10.5507 12.1098 10.2615 11.8207 9.90483 11.8207C9.54814 11.8207 9.25899 12.1098 9.25899 12.4665C9.25899 12.8232 9.54814 13.1123 9.90483 13.1123Z" fill="white"/>
  `,
};

export const TaskColorsDictionary: {
  [key in HousingStockTaskMarkerType]: string;
} = {
  [HousingStockTaskMarkerType.AllResources]: `#28305C`,
  [HousingStockTaskMarkerType.ColdWaterSupply]: '#79AFFF',
  [HousingStockTaskMarkerType.HotWaterSupply]: '#FF8C68',
  [HousingStockTaskMarkerType.Electricity]: '#E2B104',
  [HousingStockTaskMarkerType.Heat]: '#A269E9',
  [HousingStockTaskMarkerType.Calculator]: '#29E976',
  [HousingStockTaskMarkerType.Application]: '#FF4848',
};
