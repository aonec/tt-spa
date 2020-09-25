import axios from '01/axios';
import React, { useState, useRef } from 'react';
import $ from 'jquery';

export const SearchCalculator = () => {
  const buttonHandler = () => {
    console.log('buttonHandler');
    SearchCalculatorFunc();
  };

  const GetStates = () => {
    console.log('GetStates');
    console.log('five=', five);
    console.log(inputLine.current);
    console.log(inputLine.current.toString().length);
  };

  const inputLine = useRef();
  const [five, setFive] = useState([]);

  async function SearchCalculatorFunc() {
    if (inputLine.current.toString().length > 3) {
      try {
        const res = await axios.get(
          `MeteringDevices/search?Question${inputLine.current}&Take=5`,
        );
        // alert('Вычислитель успешно снят с учета !');
        console.log(res);
        setFive(res);
        return res;
      } catch (error) {
        console.log(error);
        // alert('Что-то пошло не так: попробуйте еще раз');
        throw new Error(error);
      }
    } else {
      console.log('Всё еще меньше 4');
    }
  }

  console.log('SearchCalculator');

  const Res = () => {
    const list = five.map((device) => {
      const { serialNumber } = device;
      console.log('serialNumber', serialNumber);
      return (
        <li
          onClick={() => {
            // inputLine.current = serialNumber;
            $('#input').css('color', 'red');
            $('#input').val(serialNumber);
            $('#res').css('display', 'none');
          }}
        >
          {serialNumber}
        </li>
      );
    });
    return (
      // return <div id="res">{list}</div>;
      <ul id="res">{list}</ul>
    );
  };
  return (
    <div>
      <input
        id="input"
        onChange={(event) => {
          inputLine.current = event.target.value;
        }}
      />

      <button onClick={buttonHandler}>SearchCalculator</button>
      <button onClick={GetStates}>GetStates</button>
      <Res />
    </div>
  );
};

export default SearchCalculator;
