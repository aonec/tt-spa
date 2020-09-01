import React, { useContext } from 'react';
import styled, { use } from 'reshadow/macro';
import { useHistory, useParams } from 'react-router-dom';
import { Loader } from '01/components/Loader';
import { information } from '01/r_comp';
import { DeviceContext } from '../DeviceProfile';

export const Information = ({ list = [], loading = true, ...props }) => {
  const DeviceContextResult = useContext(DeviceContext);
  // console.log('DeviceContextResult', DeviceContextResult);
  const { push } = useHistory();
  const params = useParams();
  console.log(params[1]);

  const buttonHandler = () => {
    console.log('buttonHandler', DeviceContextResult);
  };
  const test = [
    'Активен',
    '01.09.2017',
    '01.09.2017',
    '01.09.2023',
    'Электричество',
    'Туалет',
    '14',
    'Есть',
    'ИЦ НК',
    'Маяк НК',
  ];
  return styled(information)`
    Loader {
      justify-self: center;
    }
  `(
    <information {...props}>
      <h2>Информация</h2>
      {/* <button onClick={buttonHandler}>Информация</button> */}
      {/* <Loader show={loading} size="32"> */}
      {/* <info_list>
                {list.map(({ title, value, url }) => (
                    <info_item
                        key={title}
                        {...use({ url })}
                        onClick={url ? push(url) : null}
                    >
                        <span>{title}</span>
                        <span>{value}</span>
                    </info_item>
                ))}
            </info_list> */}

      <info_list>
        {list.map(({ title, value, url }, index) => (
          <info_item
            key={title}
            {...use({ url })}
            onClick={url ? push(url) : null}
          >
            <span>{title}</span>
            <span>{test[index]}</span>
          </info_item>
        ))}
      </info_list>

      {/* </Loader> */}
    </information>,
  );
};

export default Information;
