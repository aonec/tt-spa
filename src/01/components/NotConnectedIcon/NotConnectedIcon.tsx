import React from "react"
import styled from "styled-components";

type props = {
    className: string
}

export const Container: React.FC<props> = ({className}) => {
    return (
            <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <path d="M7.0029 11.6757C6.86273 11.8049 6.75031 11.9606 6.67233 12.1336C6.59436 12.3066 6.55243 12.4933 6.54905 12.6827C6.54567 12.8721 6.58091 13.0602 6.65266 13.2358C6.72441 13.4114 6.83121 13.5709 6.96669 13.7049C7.10216 13.8388 7.26353 13.9444 7.44117 14.0153C7.61882 14.0862 7.80909 14.1211 8.00065 14.1177C8.19221 14.1144 8.38112 14.0729 8.55613 13.9959C8.73113 13.9188 8.88863 13.8076 9.01924 13.6691C9.28641 13.4046 9.43647 13.0462 9.43647 12.6724C9.43647 12.2987 9.28641 11.9402 9.01924 11.6757C8.74764 11.4194 8.38658 11.2764 8.01107 11.2764C7.63556 11.2764 7.2745 11.4194 7.0029 11.6757ZM8.34871 13.0062C8.25961 13.0938 8.13908 13.1429 8.01345 13.1429C7.88781 13.1429 7.76728 13.0938 7.67818 13.0062C7.58961 12.9181 7.5399 12.799 7.5399 12.6748C7.5399 12.5506 7.58961 12.4314 7.67818 12.3433C7.76728 12.2558 7.88781 12.2066 8.01345 12.2066C8.13908 12.2066 8.25961 12.2558 8.34871 12.3433C8.43728 12.4314 8.487 12.5506 8.487 12.6748C8.487 12.799 8.43728 12.9181 8.34871 13.0062Z" fill="#272F5A"/>
                <path d="M15.0727 5.70919C13.6784 4.32275 11.9024 3.37773 9.96859 2.99326C8.03478 2.60878 6.02976 2.80208 4.20631 3.54878L3.1173 2.46621C3.02632 2.38877 2.9093 2.3483 2.78962 2.35289C2.66993 2.35749 2.5564 2.40681 2.4717 2.491C2.38701 2.57519 2.3374 2.68805 2.33277 2.80703C2.32815 2.92601 2.36886 3.04234 2.44677 3.13277L3.29325 3.97424C2.43268 4.43453 1.64444 5.01744 0.953535 5.70446C0.647723 5.99927 0.363268 6.31522 0.102297 6.64993C0.0228391 6.75212 -0.0125309 6.88149 0.00396796 7.0096C0.0204669 7.13771 0.0874834 7.25405 0.190275 7.33304C0.293066 7.41203 0.423212 7.44719 0.552082 7.43079C0.680951 7.41439 0.797989 7.34777 0.877447 7.24558C1.1118 6.93961 1.36765 6.65051 1.64309 6.38047C2.33797 5.69173 3.14107 5.12012 4.02085 4.68808L5.84221 6.49866C4.89594 6.82091 4.03572 7.35274 3.32654 8.05396C3.0603 8.31879 2.8184 8.60673 2.6037 8.91434C2.53945 9.01726 2.51738 9.14076 2.54206 9.25938C2.56674 9.37799 2.63628 9.48267 2.73633 9.5518C2.83638 9.62094 2.9593 9.64926 3.07974 9.63092C3.20019 9.61259 3.30895 9.54899 3.38361 9.45326C3.56593 9.19295 3.77122 8.94932 3.99707 8.72525C4.71179 8.01423 5.60509 7.50656 6.58407 7.25504L8.15339 8.81507C7.61208 8.79411 7.07228 8.88496 6.56807 9.08187C6.06386 9.27877 5.6062 9.57747 5.22399 9.95909C4.97713 10.2016 4.76725 10.4788 4.60102 10.7817C4.54111 10.892 4.52775 11.0215 4.56386 11.1416C4.59998 11.2617 4.68263 11.3627 4.79362 11.4222C4.90461 11.4818 5.03485 11.4951 5.15569 11.4591C5.27654 11.4232 5.37808 11.3411 5.43799 11.2308C5.56562 11.0068 5.72588 10.8029 5.91354 10.6257C6.38139 10.1577 6.99355 9.85913 7.65217 9.77771C8.3108 9.6963 8.97787 9.83673 9.54676 10.1765L12.9232 13.533C13.0142 13.6104 13.1312 13.6509 13.2509 13.6463C13.3705 13.6417 13.4841 13.5924 13.5688 13.5082C13.6535 13.424 13.7031 13.3111 13.7077 13.1922C13.7123 13.0732 13.6716 12.9569 13.5937 12.8664L7.75868 7.08485C8.54743 7.04907 9.33506 7.17638 10.0718 7.45874C10.8085 7.7411 11.4782 8.17236 12.0387 8.72525C12.2644 8.94943 12.4697 9.19306 12.6521 9.45326C12.6861 9.50777 12.731 9.55482 12.7839 9.59155C12.8368 9.62828 12.8967 9.65392 12.9599 9.66691C13.023 9.67991 13.0882 9.67998 13.1515 9.66712C13.2147 9.65427 13.2746 9.62876 13.3276 9.59214C13.3806 9.55553 13.4255 9.50857 13.4597 9.45414C13.4938 9.39971 13.5165 9.33894 13.5262 9.27553C13.536 9.21212 13.5327 9.1474 13.5165 9.08531C13.5003 9.02321 13.4716 8.96504 13.432 8.91434C13.2172 8.60683 12.9753 8.31891 12.7092 8.05396C11.9566 7.31034 11.0361 6.75632 10.0244 6.43808C9.01268 6.11984 7.93912 6.0466 6.89318 6.22447L4.94342 4.28625C6.55571 3.70268 8.3022 3.58931 9.97715 3.9595C11.6521 4.3297 13.1857 5.16803 14.3974 6.37575C14.6665 6.64789 14.916 6.93856 15.144 7.24558C15.1815 7.29525 15.2284 7.33709 15.2822 7.36872C15.3359 7.40035 15.3954 7.42115 15.4572 7.42993C15.519 7.43871 15.582 7.43529 15.6425 7.41989C15.703 7.40448 15.7598 7.37738 15.8098 7.34013C15.8597 7.30288 15.9018 7.25622 15.9336 7.2028C15.9655 7.14938 15.9864 7.09025 15.9952 7.02879C16.0041 6.96734 16.0006 6.90475 15.9851 6.84462C15.9696 6.78448 15.9424 6.72796 15.9049 6.6783C15.6509 6.33608 15.3728 6.01223 15.0727 5.70919Z" fill="#272F5A"/>
            </svg>
    )
}

export const NotConnectedIcon = styled(Container)`
    opacity: 0.7;
    &:hover {
    opacity: 1
    }
`
