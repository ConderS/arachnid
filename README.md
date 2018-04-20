# Arachnid

## Setting Up

Front-End:
- `cd js`
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

- `src/components/DataPane.js` is where vega loads the visualization and handles all the interactions
