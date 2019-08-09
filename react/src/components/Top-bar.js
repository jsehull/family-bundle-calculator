import React from 'react';

class TopBar extends React.Component {
  render() {
    return (
      <div>
        <h1 id="page-title">Family Bundle Calculator</h1>
        <div id="top-bar">
          <p>Estimated bank account: $<span id="input-balance"></span></p>
          <p>Desired spend limit: $<span id="input-spend"></span></p>
        </div>
      </div>
    );
  }
}

export default TopBar;
