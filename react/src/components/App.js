import React from 'react';
import '../index.css';
import TopBar from './Top-bar';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

class App extends React.Component {
  // constructor() {
  //   super();
  //   TAX = 0.08;
  //   this.state = {
  //     stepNumber: 0,
  //     customerBankAccount: 0,
  //     customerSpendLimit: 0,
  //     phoneName: null,
  //     phonePrice: 0,
  //     accessoryName: null,
  //     accessoryPrice: 0,
  //     bundleSize: 0,
  //     totalSpent: 0,
  //   };
  // }

  // update() {
  //   this.setState({})
  // }

  render() {

    return (
      <div>
        <img id="logo" src="../../horizon-logo.png" alt="Horizon Wireless" />
        <TopBar />
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <p className="footer">Unofficial sponsor for &copy;Forza Horizon.</p>
      </div>
    );
  }
}

export default App;
