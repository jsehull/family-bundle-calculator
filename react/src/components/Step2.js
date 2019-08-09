import React from 'react';

class Step2 extends React.Component {
  render() {
    return (
      <div className="component" id="step2">
        <h2>Planning Money</h2>
        <div className="option-box">
          <label htmlFor="bank-account">Estimate savings available:</label>
          <input id="bank-account" type="number" />
        </div>
        <div className="option-box">
          <label htmlFor="spend-limit">Enter desired spend limit:</label>
          <input id="spend-limit" type="number" />
        </div>

        <button id="done-step2" className="next">Next</button>
      </div>
    );
  }
}

export default Step2;
