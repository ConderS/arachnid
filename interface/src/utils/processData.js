export function ProcessData(JSONString, field, categories){
  console.log("PROCESSING...");
  // var JSONObject = JSON.parse(JSONString);
  var JSONObject = JSONString;
  var len = categories.length;
  for(var key in JSONObject){
    for(var i = 0; i < len; i++){
      var category = categories[i];
      if(i === len - 1){
        break;
      }
      if(JSONObject[key][field] === category){
        console.log("EL: ", JSONObject[key][field]);
        JSONObject[key][field] = categories[len-1];
      }
    }
  }
  // return JSON.stringify(JSONObject);
  return JSONObject;
}

export function ProcessYelpData(chartData, id, dataArr, deleteData = false){
  console.log("Processing...");
  
  var newChartData = chartData;

  var len = dataArr.length;
  for(var key in chartData){
    for(var i = 0; i < len; i++){
      var data = dataArr[i];
      if(!deleteData && i === len - 1){
        break;
      }
      if(chartData[key][id] === data[id]){
        console.log("Found ID of dragged bar: ", chartData[key][id]);
        if(deleteData) {
          newChartData.splice(key, 1);
        } else {
          newChartData[key]["review_count"] = dataArr[len-1]["review_count"];
        }
      }
    }
  }
  return newChartData;
}

export function ProcessMaxThreshold(chartData, attr, threshold_value){
  console.log("Processing...");
  
  var newChartData = chartData;
  // console.log("id:", id);
  // console.log("Threshold:", threshold_value);
  console.log("Threshold value: ", threshold_value);
  
  for(var key = 0; key < chartData.length; key++){
    if(attr === "business_id"){
      if(key > threshold_value){
        newChartData.splice(key, 1);
        key--;
      }
    }
    else {
      if(parseInt(chartData[key][attr]) > threshold_value) {
        console.log("Value: ", chartData[key][attr])
        newChartData.splice(key, 1);
        key--;
      } else {
        console.log("Accept: ", chartData[key][attr])
      }
    }
  }

  return newChartData;
}