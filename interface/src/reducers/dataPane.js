import yelpData from '../examples/yelp';

const screenWidth = window.innerWidth / 2;
const screenHeight = (window.innerHeight - 120) / 2;

const initialState = {
    chartData: yelpData,
    size: [screenWidth, screenHeight],
    currentDatum: [],
    xAttr: "business_id",
    yAttr: "review_count",
    chartType: "bar",
    update: 0,
};

export default function(state = initialState, action) {
    var count = state.update;
    switch(action.type) {
        case "UPDATE_DATA":
            return Object.assign({}, state, { chartData: action.data, update: count+1 });
        case "UPDATE_DIMENSIONS":
            return Object.assign({}, state, { size: [action.width, action.height], update: count+1 });
        case "UPDATE_CURRENT_DATUM":
            return Object.assign({}, state, { currentDatum: action.datum });
        case "DRIVE_CHART_UPDATE":
            return Object.assign({}, state, { update: count + 1 });
        case "GENERATE_CHART":
            return Object.assign({}, state, { chartType: action.chartType });
        default:
            return state;
    }
}