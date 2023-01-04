import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
// import { buildTimeValue } from "@testing-library/user-event/dist/utils";

const btnValues = [
  ["7", "8", "9", "DEL"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "-"],
  [".", "0", "/", "x"],
  ["RESET", "="],
];

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: "0",
    res: "0",
  });

  const math = (a, b, sign) =>
    sign === "+" ? a + b
      : sign === "-" ? a - b
      : sign === "x" ? a * b
      : a / b;

  const numClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    if (calc.num.toString().length < 16) {
      setCalc({
        ...calc,
        num: calc.num === "0" && value === "0" ? "0"
        : calc.num === "0" ? value
        : calc.num + value,
          // no whole numbers start with zero
        res: !calc.sign ? 0 : calc.res,
        // if theres no sign when number is pressed, result is 0
      });
    }
    console.log(`result ${calc.res} number ${calc.num}`)
  };

  const decimalClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
      // add decimal if not already present
    });
  };

  const signClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: calc.num === "0" ? calc.res : calc.num && calc.res ? math(Number(calc.res), Number(calc.num), calc.sign).toString() : calc.res = calc.num,
      // if result is 0, make it the number that was pressed before the sign
      num: "0",
    });

    console.log(`result ${calc.res} number ${calc.num}`)
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res: calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(calc.res), Number(calc.num), calc.sign).toString(),
        sign: "",
        num: "0",
      });
    }
    console.log(`result ${calc.res} number ${calc.num}`)
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: "0",
      res: "0",
    });
  };

  const deleteClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num.toString().length > 1 ? calc.num.toString().slice(0, -1) : "0",
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num !== "0" ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, index) => {
            return (
              <Button
                key={index}
                className={btn === "=" ? "equals" : btn === "RESET" ? "reset" : btn === "DEL" ? "delete" : ""}
                value={btn}
                onClick={
                btn === "RESET" ? resetClickHandler
                  : btn === "DEL" ? deleteClickHandler
                  : btn === "=" ? equalsClickHandler
                  : btn === "/" || btn === "x" || btn === "-" || btn === "+" ? signClickHandler
                  : btn === "." ? decimalClickHandler
                  : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
