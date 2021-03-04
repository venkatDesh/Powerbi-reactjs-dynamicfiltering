import * as React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom'
import { withRouter, RouteComponentProps, Route, Switch, Link, match } from 'react-router-dom'

import './EmbeddedReportToolbar.css';
import { PowerBiReport } from "./../../models/PowerBiModels";
import PowerBiEmbeddingService from "./../../services/PowerBiEmbeddingService";
import App from './../App'

import PowerBiService from "./../../services/PowerBiService";


import { PowerBiDataset } from "./../../models/PowerBiModels";

import * as powerbi from "powerbi-client";
import * as pbimodels from "powerbi-models";
import { callbackify } from 'util';
import ViewHome from '../ViewHome/ViewHome';
//import * as js from "../ViewReports/FilterFunction.js"

export let selVal = "Co-Axial";

interface EmbeddedReportToolbarProperties {
  embeddedReport: powerbi.Report
 

}


export default class EmbeddedReport extends React.Component<EmbeddedReportToolbarProperties,any> {

  render() {
    return (
      <div id="embedded-report-toolbar"  >
         {/*  <select  onChange={() => this.getSlicerValue() } id="selectSlicer">
            <option value="" selected={true}>Year</option>
            <option value ="CY2015">2015</option>
            <option value ="CY2016" >2016</option>
            <option value ="CY2017" >2017</option>
          </select>
          <select   onChange={() => this.getSlicerValue_cat() } id="selectSlicer_Cat">
            <option value="Select all" selected={true}>Category</option>
            <option value ="Co-Axial">Co-Axial</option>
            <option value ="Collective Pitch" >Collective Pitch</option>
            <option value ="Fixed pitch" >Fixed Pitch</option>
            <option value ="Glider" >Glider</option>
            <option value ="Trainer" >Trainer</option>
            <option value ="Warbird" >Warbird</option>
          </select>
        */}
          <button onClick={() => this.toggleReportEditMode()} >EDIT</button>
          <button onClick={() => this.enterFullScreenMode()} >FULLSCREEN</button>
          <button  onClick={() => this.printReport()} >PRINT</button>

      </div>
   
      );
  }

  private viewMode = "view";

//  getSlicerValue(){
//     let slicerVal : string= (document.getElementById("selectSlicer") as HTMLInputElement).value;
//     //localStorage.setItem("yearFilter",slicerVal);
//     //alert(slicerVal);
//   }
  
//   getSlicerValue_cat(){
  
//     let slicerVal_cat : string= (document.getElementById("selectSlicer_Cat") as HTMLInputElement).value;
//     selVal = slicerVal_cat.toString();
//     var reportid=this.props.embeddedReport.getId();
//     var urlpart = "https://app.powerbi.com/reportEmbed?reportid="+reportid;
//     const filter = {
// 			$schema: "http://powerbi.com/product.schema#basic",
// 			target: {
// 				table: "Product",
// 				column: "Category"
// 			},
// 				operator: "In",
// 				value: [selVal],
//         filterType:1,
//         displayName:'true'

// 		};
   
//     //this.props.embeddedReport.resetPersistentFilters();
//     this.props.embeddedReport.setFilters([filter]);
//     this.props.embeddedReport.reload();
//   }
  
 

  toggleReportEditMode() {
    this.viewMode = (this.viewMode == "view") ? "edit" : "view";
    this.props.embeddedReport.switchMode(this.viewMode);
    // show filter pane when entering edit mode   
    var showFilterPane = (this.viewMode == "edit");
    this.props.embeddedReport.updateSettings({
       "filterPaneEnabled": showFilterPane
   });
  };

  enterFullScreenMode() {
    this.props.embeddedReport.fullscreen();
  }

  printReport() {
    this.props.embeddedReport.print();
  }

}
