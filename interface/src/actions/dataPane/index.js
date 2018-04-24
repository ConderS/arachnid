// GENERAL 

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

export function error(msg) {
  return {
    type: "ERROR",
    msg
  }
}
// Attached to the QF 
export const processYelpMaxThreshold = (spec) => (dispatch, getState) => {
  console.log("PROCESSING (TO ENGINE)...");

  console.log("Threshold value: ", spec.thresholdValue);

  var data = {
    "chartData": spec.chartData,
    "attr": spec.attr,
    "max_threshold": spec.thresholdValue
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
      })
      .catch(err => console.log("ERROR: ", err));
}

export const addQF = (qf) => (dispatch, getState) => {
  console.log("Adding QF...");

  // In future, have different classes for each type of quality function that we can instantiate
  switch(qf.type) {
    case "Max_Threshold":
      qf["compute"] = processYelpMaxThreshold
      break;

    default:
      dispatch(error("Need to specify type of quality function"))
      return;
  }

  dispatch(_addQF(qf))
}
