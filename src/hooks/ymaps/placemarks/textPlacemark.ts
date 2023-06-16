export const getTextPlacemarkCode = (text: string) => {
  const code = `
        <div style="
            background: #28305C; 
            padding: 8px 16px;
            width: max-content; 
            display: flex; 
            align-items: center; 
            color: white;
            border: 1px solid #FFFFFF;
            box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16), 0px 8px 16px rgba(78, 93, 146, 0.08);
            border-radius: 8px;
        ">
            ${text}
        </div>
    `;

  return code;
};
