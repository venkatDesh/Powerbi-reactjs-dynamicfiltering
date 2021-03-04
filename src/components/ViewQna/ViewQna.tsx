import * as React from 'react';
import { withRouter, RouteComponentProps, Route, Switch, Link, match } from 'react-router-dom'

import PowerBiService from "./../../services/PowerBiService";

import App from './../App';
import EmbeddedQNA from './EmbeddedQNA';

import { PowerBiDataset } from "./../../models/PowerBiModels";

interface ViewQnaProperties {
  app: App
}

interface datasetIdRouteParams {
  id: string;
}

type ViewQnaPropertiesWithRouter =
  ViewQnaProperties &
  RouteComponentProps<datasetIdRouteParams>;

interface ViewQnaState {
  loadingDatasets: boolean
}

class ViewQna extends React.Component<ViewQnaPropertiesWithRouter, ViewQnaState> {

  state = {
    loadingDatasets: false
  };

  render() {
    return (
      <div id="view-Qna" >
        <div className="row">
          <div id="left-nav-col" className="col col-2">
            <div id="left-nav">
              <div id="left-nav-header">Qna Data</div>
              {this.state.loadingDatasets ? <div>loading...</div> : null}
              <ul>
                {this.props.app.state.datasets.map((dataset: PowerBiDataset, indexKey: number) => {
                  return <li key={indexKey}><a href="javascript:void(0)" onClick={() => {
                    this.props.history.push(`/qna/${dataset.id}`);
                  }} >{dataset.name}</a></li>
                })}
              </ul>
            </div>
          </div>
          <div id="content-col" className="col col-10">
            <EmbeddedQNA datasets={this.props.app.state.datasets} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getDatasets();
  }

  getDatasets = () => {
    if (!this.props.app.state.datasetsInCache) {
      this.setState({ loadingDatasets: true });
      PowerBiService.GetDatasets().then((datasets: PowerBiDataset[]) => {
        this.props.app.setState({
          datasets: datasets,
          datasetsInCache: true
        });
        this.setState({ loadingDatasets: false });
      });
    }
  }

}

export default withRouter<ViewQnaPropertiesWithRouter>(ViewQna);