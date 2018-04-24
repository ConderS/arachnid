// GENERAL 
import { ProcessYelpData } from '../../utils/processData';

export function updateData(data) {
    return {
        type: "UPDATE_DATA",
        data
    }
}

export function updateDimensions(width, height) {
    return {
        type: "UPDATE_DIMENSIONS",
        width,
        height
    }
}

export function updateCurrentDatum(datum) {
    return {
        type: "UPDATE_CURRENT_DATUM",
        datum
    }
}

export function driveChartUpdate() {
    return {
        type: "DRIVE_CHART_UPDATE"
    }
}

export function generateChart(chartType) {
    return {
        type: "GENERATE_CHART",
        chartType
    }
}

export function _addQF(qf) {
  return {
    type: "ADD_QF",
    qf
  }
}

export function clearQFList() {
  return {
    type: "CLEAR_QF_LIST"
  }
}

export function error(msg) {
  return {
    type: "ERROR",
    msg
  }
}
// Attached to the QF 
export const processYelpMaxThreshold = (spec) => (dispatch, getState) => {
  console.log("Processing (sending spec to engine) ...");

  console.log("SPEC: ", spec);

  console.log("Threshold value: ", spec.pursue);

  var data = {
    "chartData": spec.chartData,
    "attr": spec.attr,
    "max_threshold": spec.pursue
  }

  var request = new Request("http://localhost:8111/api/yelp-threshold", {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  });

  fetch(
      request)
      .then(response => response.json())
      .then(data => {
        console.log("Respond Data: ", data);
        dispatch(updateData(data));
        dispatch(clearQFList());
      })
      .catch(err => console.log("ERROR: ", err));
}

export const processYelpData = (spec) => (dispatch, getState) => { 
  
  var newData = []
  if (spec.type === "Delete_One") {
    newData = ProcessYelpData(spec.chartData, spec.attr, spec.pursue, true);
  } else {
    newData = ProcessYelpData(spec.chartData, spec.attr, spec.pursue);
  }


  console.log("Finished processing data");
  dispatch(updateData(newData));
  dispatch(clearQFList());
}

export const addQF = (qf) => (dispatch, getState) => {
  console.log("Adding QF...");

  // In future, have different classes for each type of quality function that we can instantiate
  // switch(qf.type) {
  //   case "Max_Threshold":
  //     qf["compute"] = processYelpMaxThreshold;
  //     break;
  //   case "Dedup_Two":
  //     qf["compute"] = _processYelpData;
  //     break;
  //   case "Delete_One":
  //     qf["compute"] = _processYelpData;
  //     break;
  //   default:
  //     dispatch(error("Need to specify type of quality function"))
  //     return;
  // }

  dispatch(_addQF(qf))
}
