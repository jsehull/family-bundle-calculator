import React from 'react';

class Step1 extends React.Component {
  render() {
    return (
      <div className="component" id="step1">
        <h2>Summer Sale Blowout</h2>
        <div className="option-box">
          <p>Bulk-buy phones and accessories to save money for the whole family!</p>
        </div>

        <button id="done-step1">Begin</button>
      </div>
    );
  }
}

export default Step1;
