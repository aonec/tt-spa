export const getCountPlacemarkCode = (count: number) => {
  return `
        <div
            style="
                height: 18px;
                min-width: 18px;
                background: #FFFFFF;
                border: 1px solid rgba(39, 47, 90);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                width: max-content;
                padding: 0 4px;
                font-weight: bold;
                transform: translate(20px, -40px);
            "
        >
            ${count}
        </div>
    `;
};
