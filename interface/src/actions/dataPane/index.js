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


export const processYelpMaxThreshold = (chartData, attr, threshold_value) => (dispatch, getState) => {
  console.log("PROCESSING (TO ENGINE)...");

  console.log("Threshold value: ", threshold_value);

  var data = {
    "chartData": chartData,
    "attr": attr,
    "max_threshold": threshold_value
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
