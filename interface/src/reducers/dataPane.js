import yelpData from '../examples/yelp';

const screenWidth = window.innerWidth / 2;
const screenHeight = (window.innerHeight - 120) / 2;

const initialState = {
    chartData: yelpData,
    size: [screenWidth, screenHeight]
};

export default function(state = initialState, action) {
    switch(action.type) {
        case "UPDATE_DATA":
            return Object.assign({}, state, { chartData: action.data});
        default:
            return state;
    }
}