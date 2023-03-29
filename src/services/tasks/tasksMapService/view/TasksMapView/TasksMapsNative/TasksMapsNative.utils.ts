import { HousingStockWithTasksResponse } from 'myApi';
import { GetPlacemarkerLayoutLinkResponse } from '../TasksMap/TasksMap.types';

export const getClusterIcon = (
  housingStockWithTasks: HousingStockWithTasksResponse[],
): GetPlacemarkerLayoutLinkResponse => {
  const svgCodeText = `
    <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.772217" y="0.053894" width="50" height="50" rx="25" fill="#28305C"/>
<path d="M43.456 7.39996L25.9333 25.1115L50.7309 24.2041C50.4454 17.6099 47.6583 11.1015 43.456 7.39996Z" fill="#FF8C68"/>
<path d="M50.8278 24.1084L25.9334 25.1114L44.688 41.3597C48.9763 36.3423 51.3767 29.6816 50.8278 24.1084Z" fill="#E2B104"/>
<path d="M26.6515 0.074004L25.7722 25.1114L43.4919 7.34679C38.7835 2.72108 32.2837 -0.116861 26.6515 0.074004Z" fill="#79AFFF"/>
<g filter="url(#filter0_b_0_1)">
<rect x="7.77222" y="7.05389" width="36" height="36" rx="18" fill="white"/>
</g>
<path d="M17.4904 30.3307H24.8504V28.9547H19.4744L22.4184 26.1707C22.813 25.7974 23.1597 25.4454 23.4584 25.1147C23.757 24.7841 24.0077 24.4641 24.2104 24.1547C24.4237 23.8347 24.5837 23.5307 24.6904 23.2427C24.797 22.9441 24.8504 22.6454 24.8504 22.3467C24.8504 21.8667 24.765 21.4241 24.5944 21.0187C24.4237 20.6027 24.1784 20.2454 23.8584 19.9467C23.5384 19.6481 23.149 19.4187 22.6904 19.2587C22.2424 19.0881 21.7357 19.0027 21.1704 19.0027C20.6157 19.0027 20.109 19.0881 19.6504 19.2587C19.2024 19.4187 18.8184 19.6534 18.4984 19.9627C18.1784 20.2614 17.9277 20.6187 17.7464 21.0347C17.5757 21.4507 17.4904 21.9094 17.4904 22.4107H19.0584C19.0584 22.1014 19.1064 21.8241 19.2024 21.5787C19.309 21.3227 19.453 21.1094 19.6344 20.9387C19.8157 20.7574 20.0344 20.6187 20.2904 20.5227C20.557 20.4267 20.8504 20.3787 21.1704 20.3787C21.4904 20.3787 21.7784 20.4267 22.0344 20.5227C22.301 20.6187 22.525 20.7521 22.7064 20.9227C22.8877 21.0934 23.0264 21.3014 23.1224 21.5467C23.229 21.7814 23.2824 22.0481 23.2824 22.3467C23.2824 22.5494 23.245 22.7521 23.1704 22.9547C23.0957 23.1574 22.9784 23.3761 22.8184 23.6107C22.6584 23.8347 22.4504 24.0801 22.1944 24.3467C21.949 24.6134 21.6557 24.9174 21.3144 25.2587L17.4904 28.9547V30.3307ZM25.9672 27.8187H31.3752V30.3307H32.8792V27.8187H34.2872V26.4427H32.8792V19.1307H30.9272L25.9672 26.4427V27.8187ZM27.6152 26.4427L31.3752 20.8107V26.4427H27.6152Z" fill="#28305C"/>
<defs>
<filter id="filter0_b_0_1" x="-0.227783" y="-0.946106" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1" result="shape"/>
</filter>
</defs>
</svg>

`;

  const iconHrev = 'data:image/svg+xml;base64,' + btoa(svgCodeText);

  return {
    iconHrev,
    size: {
      width: 52,
      height: 52,
    },
  };
};
