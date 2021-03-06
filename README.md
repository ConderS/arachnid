# Arachnid

## Setting Up

Front-End:
- `cd interface`
- `npm install` to install dependencies
- `npm start` to run locally

Server:
- In root directory
- `pip install -r requirements.txt` to install dependencies
- `python server.py` to run locally

If you happen to want to run the engine itself (in isolation from the server):
- Create separate virtualenv
- `cd engine`
- `pip install -r requirements.txt`

## Key Files

### In `interface` 

- `src/components/DataPane.js` is the parent component for the charts and adds additional actions for handling interactions
- `src/components/BarChart.js` contains all d3 logic for the BarChart compoennt
- `src/components/ScatterPlot.js` contains all d3 logic for the ScatterPlot component
- `src/actions/dataPane/index.js` is where quality functions will be sent to the server 
