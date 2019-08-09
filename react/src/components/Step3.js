import React from 'react';

class Step3 extends React.Component {
  render() {
    return (
      <div className="component" id="step3">
        <h2>Bundle Selections</h2>
        <div className="option-box vertical">
          <label htmlFor="phone-select">Choose your phone bundle: </label>
          <select id="phone-select">
            <option value="0">-Select a phones-</option>
            <option value="250">iPhone6s</option>
            <option value="450">iPhone7</option>
            <option value="600">iPhone8</option>
            <option value="750">iPhone Xr</option>
            <option value="900">Samsung S10</option>
            <option value="1700">Samsung S10+</option>
            <option value="5">Nokia 3310</option>
          </select>
        </div>
        <div className="option-box vertical">
          <label htmlFor="accessory-select">Choose your headphone bundle:</label>
          <select id="accessory-select">
            <option value="0">-Select your accessories</option>
            <option value="30">Earbuds</option>
            <option value="200">iPhone Earpods</option>
            <option value="3">Walkman headphones</option>
          </select>
        </div>
        <div className="option-box vertical">
          <label htmlFor="bundle-select">Choose number of family members:</label>
          <select id="bundle-select">
            <option value="0">-Family Size-</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
            <option value="6">Six</option>
          </select>
        </div>
        <div className="option-box button">
          <button id="back-step3" className="back">Back</button>
          <button id="done-step3" className="next">Next</button>
        </div>
      </div>
    );
  }
}

export default Step3;
