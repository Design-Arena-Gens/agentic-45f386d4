'use client';

import { useState } from 'react';
import './styles.css';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '×': return prev * current;
      case '÷': return prev / current;
      default: return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setNewNumber(true);
    }
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>

      <div className="buttons">
        <button className="btn function" onClick={handleClear}>AC</button>
        <button className="btn function" onClick={handleToggleSign}>+/-</button>
        <button className="btn function" onClick={handlePercent}>%</button>
        <button className="btn operator" onClick={() => handleOperation('÷')}>÷</button>

        <button className="btn" onClick={() => handleNumber(7)}>7</button>
        <button className="btn" onClick={() => handleNumber(8)}>8</button>
        <button className="btn" onClick={() => handleNumber(9)}>9</button>
        <button className="btn operator" onClick={() => handleOperation('×')}>×</button>

        <button className="btn" onClick={() => handleNumber(4)}>4</button>
        <button className="btn" onClick={() => handleNumber(5)}>5</button>
        <button className="btn" onClick={() => handleNumber(6)}>6</button>
        <button className="btn operator" onClick={() => handleOperation('-')}>-</button>

        <button className="btn" onClick={() => handleNumber(1)}>1</button>
        <button className="btn" onClick={() => handleNumber(2)}>2</button>
        <button className="btn" onClick={() => handleNumber(3)}>3</button>
        <button className="btn operator" onClick={() => handleOperation('+')}>+</button>

        <button className="btn zero" onClick={() => handleNumber(0)}>0</button>
        <button className="btn" onClick={handleDecimal}>.</button>
        <button className="btn operator" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
}
