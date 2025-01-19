import React, { useState } from 'react';
import './App.css';

function App() {
  const [bill, setBill] = useState<number | null>(null);
  const [tipPercentage, setTipPercentage] = useState<number | null>(15);
  const [numberOfPeople, setNumberOfPeople] = useState<number | null>(5);
  const [customTip, setCustomTip] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const [peopleInputError, setPeopleInputError] = useState<boolean>(false);

  const handleBillChange = (value: number | null) => {
    setBill(value);
  };

  const handleTipSelect = (percentage: number | null) => {
    setTipPercentage(percentage);
    setShowCustomInput(false);
    setCustomTip('');
  };

  const handleCustomTipClick = () => {
    setShowCustomInput(true);
    setTipPercentage(null);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(e.target.value);
    setTipPercentage(null);
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value < 0) {
      setNumberOfPeople(0);
      setPeopleInputError(true);
    } else {
      setNumberOfPeople(isNaN(value) ? null : value);
      setPeopleInputError(false);
    }
  };

  const handleReset = () => {
    setBill(null);
    setTipPercentage(15);
    setNumberOfPeople(5);
    setCustomTip('');
    setShowCustomInput(false);
    setPeopleInputError(false);
  };

  const calculateTipAmountPerPerson = () => {
    if (bill === null || numberOfPeople === null || numberOfPeople === 0) {
      return 0;
    }

    const currentTipPercentage = showCustomInput && customTip !== '' ? parseFloat(customTip) : tipPercentage;
    if (currentTipPercentage === null) {
      return 0;
    }
    return (bill * (currentTipPercentage / 100)) / numberOfPeople;
  };

  const calculateTotalPerPerson = () => {
    if (bill === null || numberOfPeople === null || numberOfPeople === 0) {
      return 0;
    }
    const currentTipPercentage = showCustomInput && customTip !== '' ? parseFloat(customTip) : tipPercentage;
    const tipAmount = currentTipPercentage !== null ? (bill * (currentTipPercentage / 100)) : 0;
    return (bill + tipAmount) / numberOfPeople;
  };

  const tipPerPerson = calculateTipAmountPerPerson();
  const totalPerPerson = calculateTotalPerPerson();

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1>SPLITTER</h1>
        <div className="card">
          <div className="input-fields">
            <div className="bill-input">
              <label htmlFor="bill">Bill</label>
              <div className="input-container">
                <span>$</span>
                <input
                  type="number"
                  id="bill"
                  placeholder="0"
                  value={bill === null ? '' : bill.toFixed(2)}
                  onChange={(e) => handleBillChange(e.target.value === '' ? null : parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="tip-selector">
              <label>Select Tip %</label>
              <div className="buttons">
                {[5, 10, 15, 25, 50].map((percentage) => (
                  <button
                    key={percentage}
                    className={`tip-button ${tipPercentage === percentage ? 'active' : ''}`}
                    onClick={() => handleTipSelect(percentage)}
                  >
                    {percentage}%
                  </button>
                ))}
                <button className="tip-button custom" onClick={handleCustomTipClick}>
                  {showCustomInput ? (
                    <input
                      type="number"
                      placeholder="Custom"
                      value={customTip}
                      onChange={handleCustomTipChange}
                      style={{
                        width: 'calc(100% - 10px)',
                        padding: '10px',
                        textAlign: 'center',
                        borderRadius: '5px',
                        border: 'none',
                        outline: 'none',
                        backgroundColor: '#f3f9fa',
                        color: '#00474b',
                        fontSize: '20px',
                      }}
                    />
                  ) : (
                    'Custom'
                  )}
                </button>
              </div>
            </div>

            <div className="number-of-people">
              <label htmlFor="people">Number of People</label>
              <div className="input-container">
                <img src="/person-icon.svg" alt="Person Icon" style={{ marginRight: '10px', height: '20px', opacity: 0.3 }} />
                <input
                  type="number"
                  id="people"
                  placeholder="0"
                  value={numberOfPeople === null ? '' : numberOfPeople.toString()}
                  onChange={handlePeopleChange}
                  style={{ border: peopleInputError ? '2px solid red' : 'none' }}
                />
              </div>
              {peopleInputError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>Can't be zero</div>}
            </div>
          </div>
          <div className="results">
            <div className="result-display">
              <div className="row">
                <div className="label">
                  Tip Amount <span className="sub-label">/ person</span>
                </div>
                <div className="value">${tipPerPerson.toFixed(2)}</div>
              </div>
              <div className="row">
                <div className="label">
                  Total <span className="sub-label">/ person</span>
                </div>
                <div className="value">${totalPerPerson.toFixed(2)}</div>
              </div>
            </div>
            <button className="reset-button" onClick={handleReset}>
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;