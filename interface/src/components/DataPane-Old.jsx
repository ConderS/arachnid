import React, { Component } from 'react';

import '../styles/components/datapane.css';
import * as vega from 'vega';
import { ProcessData } from '../utils/processData';

export class DataPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: null,
            spec: this._spec(),
            datum: [],
            allowDedup: false,
            selectedField: ''
        };

        this.renderDatum = this.renderDatum.bind(this);
        this.addToVariablesList = this.addToVariablesList.bind(this);
        this.shiftClickHandler = this.shiftClickHandler.bind(this);
        this.hideOrShowDedupButton = this.hideOrShowDedupButton.bind(this);
        this.handleDedupButton = this.handleDedupButton.bind(this);
        this.addSelectedField = this.addSelectedField.bind(this);
        this.setupView = this.setupView.bind(this);
    }

    componentDidMount() {
      this.setupView();
    }

    componentDidUpdate() {

    }

    setupView() {
      const { spec } = this.state;
      const { chartData } = this.props;

      console.log("Re-rendering Vega...");

      var runtime = vega.parse(spec);

      var view = new vega.View(runtime)
      .logLevel(vega.Info)
      .initialize(document.querySelector('#view'))
      .hover()
      .insert('table', chartData)
      .addEventListener("click", this.shiftClickHandler)
      .run();

      this.setState({ spec, view });
    }

    shiftClickHandler(event, item) {
      if (event.shiftKey) {
        console.log('Shift-Click: ', event, item);
        console.log("SelectBar: ", this.state.view.signal("selectBar"));

        if (!item) { return; }

        this.addToVariablesList(item);
        this.addSelectedField(item);
        this.hideOrShowDedupButton();
      }
    }

    addToVariablesList(item) {
       const city = item.datum.city;
       var { datum } = this.state;

       if (datum.includes(city)) {
         const index = datum.indexOf(city);
         datum.splice(index, 1);
       } else {
         datum.push(city);
       }

       this.setState({ datum });
    }

    addSelectedField(item) {
       this.setState({ selectedField: 'city' });
    }

    hideOrShowDedupButton() {
      const { datum } = this.state;

      if (datum.length > 0) {
        this.setState({ allowDedup: true });
      } 
    }

    renderDedupButton() {
      const { allowDedup } = this.state;

      if (allowDedup) {
        return (<button className="data-btn btn btn-primary" onClick={this.handleDedupButton}>Deduplicate</button>);
      }
    }

    handleDedupButton() {
      const { selectedField, datum } = this.state;
      const { data } = this.props;
      
      const newData = ProcessData(data, selectedField, datum);

      console.log("new Data: ", newData);
      this.setState({ datum: [], data: newData, allowDedup: false });
      this.setupView();
    }


    renderDatum() {

      const { datum } = this.state;

      if (!datum) { return; }

      return datum.map((item, index) => {
          
          return <p key={index} className="datum-text">{item}</p>
        });
    }

    render() {        

        return (
            <div>
                <div className="variablesMenu">
                  <h1 className="variablesMenuHeader">Attributes</h1>
                  {this.renderDatum()}
                  {this.renderDedupButton()}
                </div>
                <div id="view"></div>
            </div>
            )
    }

    _spec() {
        return {
          "width": 800,
          "height": 500,
          "padding": 5,
          "mark": "bar",
          "data": [
            {
              "name": "table",
              "transform": [
                {
                  "type": "aggregate",
                  "groupby": ["city"],
                  "ops": ["average"],
                  "fields": ["review_count"],
                  "as": ["average_reviews"]
                }
              ]
            }
          ],
          "signals": [
            {
              "name": "selectBar",
              "description": "color of bar changes on selection",
              "value": "steelBlue",
              "on": [
     
              ]
            }
          ],
          "scales": [
            {
              "name": "xscale",
              "type": "band",
              "domain": {"data": "table", "field": "city"},
              "range": "width",
              "padding": 0.50,
              "round": true
            },
            {
              "name": "yscale",
              "domain": {"data": "table", "field": "average_reviews"},
              "nice": true,
              "range": "height"
            }
          ],

          "axes": [
            {
              "scale": "xscale",
              "orient": "bottom",
              "labelOverlap": true,
              "title": "City",
              "zindex": 1,
              "encode": {
                "labels": {
                  "update": {
                    "angle": {"value": 270},
                    "align": {"value": "right"},
                    "baseline": {"value": "middle"}
                  }
                }
              }
            },
            {
              "scale": "yscale",
              "orient": "left",
              "labelOverlap": true,
              "tickCount": {"signal": "ceil(height/40)"},
              "title": "Average Reviews",
              "zindex": 1
            },
            {
              "scale": "yscale",
              "orient": "left",
              "domain": false,
              "grid": true,
              "labels": false,
              "maxExtent": 0,
              "minExtent": 0,
              "tickCount": {"signal": "ceil(height/40)"},
              "ticks": false,
              "zindex": 0,
              "gridScale": "xscale"
            }
          ],

          "marks": [
            {
              "type": "rect",
              "from": {"data":"table"},
              "encode": {
                "enter": {
                  "x": {"scale": "xscale", "field": "city"},
                  "width": {"scale": "xscale", "band": 1},
                  "y": {"scale": "yscale", "field": "average_reviews"},
                  "y2": {"scale": "yscale", "value": 0}
                },
                "update": {
                  "fill": {"signal": "selectBar"}

                }
              }
            }
          ]
        }
    }
}

export default DataPane;