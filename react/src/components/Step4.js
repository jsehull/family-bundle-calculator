import React from 'react';

class Step4 extends React.Component {
  render() {
    return (
      <div className="component" id="step4">
        <h2>Selection Summary</h2>
        <div className="option-box vertical">
          <p id="summary-spent" />

          <ul className="summary-list">
            <li id="summary-phone">
              <span id="phone-name" className="bold" />
              each:
              <span id="phone-price" className="bold" />
            </li>
            <li id="summary-accessory">
              <span id="accessory-name" className="bold" />
                each:
              <span id="accessory-price" className="bold" />
            </li>
            <li>
              Family member size:
              <span id="bundle-size" className="bold" />
            </li>
            <li id="summary-spent-bar">
              Total Bundle Cost:
              <span id="summary-total-spent" className="bold" />
            </li>
          </ul>
          <p>You will have <span id="summary-bank" className="bold" /> remaining.</p>
        </div>
        <div className="option-box button">
          <button id="back-step4" className="back">Back</button>
          <button id="done-step4" className="next cart">Add to Cart</button>
        </div>
      </div>
    );
  }
}

export default Step4;
