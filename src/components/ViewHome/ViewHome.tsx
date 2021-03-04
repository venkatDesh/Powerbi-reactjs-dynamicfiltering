import * as React from 'react';
import './ViewHome.css';

export default class ViewHome extends React.Component<any, any> {
  render() {
    return (
      <div id="view-home" className="content-body" >
        <div className="row">
          <div className="jumbotron col">
            <h3>Power BI-React Demo App</h3>
            <p>This is a demo of a single page application (SPA) that use React.js and Power BI Report Embedding.</p>
          </div>
        </div>
    
      </div>
    );
  }
}
