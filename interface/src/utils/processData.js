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