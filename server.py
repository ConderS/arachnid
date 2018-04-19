import os
from flask import Flask, jsonify, flash, request, session, render_template, g, redirect, Response, url_for
from flask_cors import CORS, cross_origin
import json

import environ
import pandas as pd

# import sys
# currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
# parentdir = os.path.dirname(currentdir)
# sys.path.insert(0, parentdir)

from engine.alphaclean.constraint_languages.pattern import Float, Pattern
from engine.alphaclean.search import *

tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app = Flask(__name__, template_folder=tmpl_dir)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def index():
    return render_template('index.html')


@app.route('/api/yelp-threshold', methods=['POST'])
def yelp_threshold():
    body = request.data
    print("Request Data: ", request.data)

    data = json.loads(body)

    print("Loaded Json: ", data)

    print("Parsed Chart Data ", data["chartData"])

    print("Max Threshold: ", data["max_threshold"])

    clean_data = set_max_threshold_yelp(data["chartData"], data["max_threshold"])
    return jsonify(clean_data)


def set_max_threshold_yelp(in_data, max_threshold):
    # print(data.head(4))
    data = pd.DataFrame(in_data)
    print("Dataframed Data: ", data)

    patterns = []
    patterns += [Float('stars', [1, max_threshold])]

    config = DEFAULT_SOLVER_CONFIG
    config['dependency']['operations'] = [Delete]
    operation, output = solve(data, patterns = patterns, dependencies = [], config = config)

    print(operation, output)
    output.dropna(subset=['stars'], how='all', inplace = True)
    return output


app.secret_key = 'a mysterious key unbeknowst to man'

if __name__ == "__main__":
  import click

  @click.command()
  @click.option('--debug', is_flag=True)
  @click.option('--threaded', is_flag=True)
  @click.argument('HOST', default='0.0.0.0')
  @click.argument('PORT', default=8111, type=int)
  def run(debug, threaded, host, port):
    """
    This function handles command line parameters.
    Run the server using:

        python server.py

    Show the help text using:

        python server.py --help

    """

    HOST, PORT = host, port
    print("running on %s:%d" % (HOST, PORT))
    app.run(host=HOST, port=PORT, debug=debug, threaded=threaded)


  run()
