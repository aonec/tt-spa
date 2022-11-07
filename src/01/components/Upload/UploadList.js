import React, { useEffect } from 'react';

import { Icon, Loader } from '01/components';

export const UploadList = ({
  items = [],
  del = () => {},
  clearList = () => {},
  ...props
}) => {
  useEffect(() => {
    clearList();
  }, []);

  return (
    <upload_list {...props}>
      {items.map(({ url, name, id, deleted = false }) => (
        <file_wrapper key={id} {...use({ deleted })}>
          <file as="a" href={url} target="_blank" rel="noreferrer noopener">
            {name}
          </file>
          <Loader show={deleted}>
            <Icon icon="del" onClick={del(id)} />
          </Loader>
        </file_wrapper>
      ))}
    </upload_list>
  );
};
