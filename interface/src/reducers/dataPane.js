import yelpData from '../examples/yelp';

const screenWidth = window.innerWidth / 2;
const screenHeight = (window.innerHeight - 120) / 2;

const initialState = {
    chartData: yelpData,
    size: [screenWidth, screenHeight],
    update: 0
};

export default function(state = initialState, action) {
    var count = state.update;
    switch(action.type) {
        case "UPDATE_DATA":
            return Object.assign({}, state, { chartData: action.data, update: count+1 });
        default:
            return state;
    }
}