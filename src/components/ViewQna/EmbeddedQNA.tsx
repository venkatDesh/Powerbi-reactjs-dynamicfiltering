import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'

import { PowerBiDataset, PowerBiReport } from "../../models/PowerBiModels";
import PowerBiEmbeddingService from "../../services/PowerBiEmbeddingService";

import EmbeddedReportToolbar from '../ViewReports/EmbeddedReportToolbar';

import * as powerbi from "powerbi-client";
import * as pbimodels from "powerbi-models";

interface EmbeddedQNAProperties {
  datasets: PowerBiDataset[]
}

interface EmbeddedQNARouteParams {
  id: string;
}

type EmbeddedQNAPropertiesWithRouter =
  EmbeddedQNAProperties &
  RouteComponentProps<EmbeddedQNARouteParams>;

interface EmbeddedQNAState {
  embeddedQNA: powerbi.Qna | undefined
}

class EmbeddedQNA extends React.Component<EmbeddedQNAPropertiesWithRouter, EmbeddedQNAState> {
  render() {
    let datasetIdRouteParam: string = this.props.match.params.id;
    let noDatasetId = (datasetIdRouteParam === undefined);
    let dataset: PowerBiDataset | undefined = this.props.datasets.find((dataset: PowerBiDataset) => dataset.id == datasetIdRouteParam);
    let badDatasetId: boolean = (datasetIdRouteParam != "") && (dataset === undefined)
    if (noDatasetId) {
      return (
        <div className="message-body" >
          click dataset in left nav to use QnA
        </div>);
    }
    if (badDatasetId) {
      return (
        <div className="message-body" >
          <div>'{datasetIdRouteParam}' is not a valid dataset id</div>
        </div>);
    }return (
      <div id="embedded-Qna" >
        <div id='embed-container' ></div>
      </div>);
  }


  componentDidUpdate() {
    this.updateEmbeddedQNA();
  }
  componentDidMount() {
    this.updateEmbeddedQNA();
  }
  
  updateEmbeddedQNA() {
    let datasetIdRouteParam: string = this.props.match.params.id;
    let dataset: PowerBiDataset | undefined = this.props.datasets.find((dataset: PowerBiDataset) => dataset.id == datasetIdRouteParam);
    if (dataset) {
      var embedContainer: HTMLElement = document.getElementById('embed-container')!;
      PowerBiEmbeddingService.embedQnA(dataset!, embedContainer);
      
    }
  }
}

export default withRouter<EmbeddedQNAPropertiesWithRouter>(EmbeddedQNA);