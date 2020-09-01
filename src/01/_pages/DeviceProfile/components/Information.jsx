import React, { useContext } from 'react';
import styled, { use } from 'reshadow/macro';
import { useHistory, useParams } from 'react-router-dom';
import { Loader } from '01/components/Loader';
import { information } from '01/r_comp';
import { convertDate } from '01/_api/utils/convertDate';
import moment from 'moment';
import { DeviceContext } from '../DeviceProfile';

export const Information = ({ list = [], loading = true, ...props }) => {
  const DeviceContextResult = useContext(DeviceContext);
  // console.log('DeviceContextResult', DeviceContextResult);
  const { push } = useHistory();
  const params = useParams();
  console.log(params[1]);

  console.log(props);

  const {
    commercialAccountingDate,
    futureCheckingDate,
    lastCheckingDate,
  } = props;

  const buttonHandler = () => {
    console.log('buttonHandler', DeviceContextResult);
  };
  const test = [
    'Данныe обновляются',
    // 'Данныe обновляются',
    convertDate(commercialAccountingDate) || 'Данныe обновляются',
    // 'Данныe обновляются',
    convertDate(lastCheckingDate) || 'Данныe обновляются',
    convertDate(futureCheckingDate) || 'Данныe обновляются',
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
