import React, { Component } from 'react';

import '../styles/components/datapane.css';
import * as vega from 'vega';

const DATA = require('../examples/cars.json');

export class DataPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vis: null,
            datum: ''
        };

        this.renderDatum = this.renderDatum.bind(this);

    }

    componentDidMount() {

        const spec = this._spec();

        var runtime = vega.parse(spec);

        var view = new vega.View(runtime)
        .logLevel(vega.Info)
        .initialize(document.querySelector('#view'))
        .hover()
        .insert('table', DATA)
        .addEventListener("click", (event, item) => {
            console.log("Click: ", event, item.datum.Name.toString());
            this.setState({ datum: item.datum.Name });
        })
        .addEventListener("dragstart", function(event) {
            console.log("Dragstart: ", event);
        })
        .run();
    }

    renderDatum() {

      const { datum } = this.state;

      console.log("DATUM: ", datum);

      if (!datum) { return; }

      return (
        <h1 className="data-text">{datum}</h1>
        )
    }

    render() {        

        return (
            <div>
                <div className="data-text-container">{this.renderDatum()}</div>
                <div id="view"></div>
            </div>
            )
    }

    _spec() {
        return {
          "width": 800,
          "height": 500,
          "padding": 5,

          "data": [
            {
              "name": "table"
            }
          ],

          "scales": [
            {
              "name": "xscale",
              "type": "band",
              "domain": {"data": "table", "field": "Origin"},
              "range": "width",
              "padding": 0.50,
              "round": true
            },
            {
              "name": "yscale",
              "domain": {"data": "table", "field": "Weight_in_lbs"},
              "nice": true,
              "range": "height"
            }
          ],

          "axes": [
            {
              "scale": "xscale",
              "orient": "bottom",
              "labelOverlap": true,
              "title": "Origin",
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
              "title": "Weight_in_lbs",
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
                  "x": {"scale": "xscale", "field": "Origin"},
                  "width": {"scale": "xscale", "band": 1},
                  "y": {"scale": "yscale", "field": "Weight_in_lbs"},
                  "y2": {"scale": "yscale", "value": 0}
                },
                "update": {
                  "fill": {"value": "steelblue"}
                }
              }
            }
          ]
        }
    }
}

export default DataPane;