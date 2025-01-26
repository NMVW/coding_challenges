/*
  Build your iPhone's calculator app
  (used stackblitz https://stackblitz.com/edit/react-pjyeh1?file=src%2FApp.js)
**/
import React from 'react';
// import './style.css';

export default function App() {
  return <Calculator />;
}

function Calculator() {
  const [value, setValue] = React.useState(0);
  const [listOfNumbers, setList] = React.useState([]);
  const [lastOp, setOp] = React.useState('=');
  return (
    <>
      <Result value={value} />
      <div>My in memory list of numbers: {listOfNumbers}</div>
      <Buttons
        operate={(operator) => {
          const [nextValue, nextOp] = calculate(
            listOfNumbers,
            value,
            operator,
            lastOp
          );
          setValue(nextValue);
          // clear list of numbers from memory
          if (operator !== '=') setList([]);
          setOp(nextOp);
        }}
        addToList={(number) => setList([...listOfNumbers, number])}
        value={value}
        reset={() => {
          setValue(0);
          setList([]);
          setOp('=');
        }}
      />
    </>
  );
}

function calculate(list, currValue, currOp, prevOp) {
  // operate on number and current value
  const nextNumber = +list.join('');
  let nextValue = currValue;

  switch (currOp) {
    case '+':
      nextValue += nextNumber;
      break;
    case '-':
      nextValue -= nextNumber;
      break;
    case '=':
      return calculate(list, currValue, prevOp);
  }

  return [nextValue, currOp];
}

function Result(props) {
  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
      {props.value}
    </div>
  );
}

function Buttons(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        className="equidistant-boxes"
        style={{ padding: '.5rem', display: 'flex', flexDirection: 'row' }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <Digit press={() => props.addToList(number)} number={number} />
        ))}
        <div style={{ margin: '1rem' }} onClick={props.reset}>
          A/C
        </div>
        <div style={{ padding: '2rem' }} onClick={() => props.addToList('.')}>
          .
        </div>
      </div>
      <div
        className="plus-minus-equals-column"
        style={{ flexDirection: 'column' }}
      >
        <div style={{ margin: '1rem' }} onClick={() => props.operate('+')}>
          +
        </div>
        <div style={{ margin: '1rem' }} onClick={() => props.operate('-')}>
          -
        </div>
        <div style={{ margin: '1rem' }} onClick={() => props.operate('=')}>
          =
        </div>
      </div>
    </div>
  );
}

const basicBoxStyle = {
  margin: '.5rem',
};

function Digit(props) {
  return (
    <div style={basicBoxStyle} onClick={props.press}>
      {props.number}
    </div>
  );
}

function SmallBox() {}
