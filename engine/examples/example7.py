import environ
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

#Load the rain fall data
f = open('datasets/all_villages_2010-16.csv','r')
datafile = f.readlines()

data = [  { str(i):j for i,j in enumerate(l.strip().split(',')) } for l in datafile[2:]]
locations = [  { str(i):j for i,j in enumerate(l.strip().split(',')) if i >= 3} for l in datafile[0:2]]

#only put the data into a dataframe
df = pd.DataFrame(data)



from alphaclean.constraint_languages.pattern import Float

from alphaclean.constraint_languages.statistical import Correlation, NumericalRelationship

#All of the numerical columns have to be positive floats:
patterns = []
for i in range(3,84):
    patterns.append(Float(str(i), [0, np.inf]))


models = []

#Calculate the distances between villages enforce a positive correlations between nearby villages
for l in locations[0]:
    lat_long = np.array([float(locations[0][l]), float(locations[1][l])])
    distances = [ 
                    (np.linalg.norm( np.array([float(locations[0][other]), \
                                      float(locations[1][other])])\
                   -lat_long), other) \

                    for other in locations[0] if l != other\
                ]

    distances = sorted(distances)

    if distances[0][0] == 0.0:
      models.append(NumericalRelationship([l, distances[0][1]], lambda x: x))



#Solve
from alphaclean.search import *

config = DEFAULT_SOLVER_CONFIG

#no search for pattern constraints, just enforce float
config['pattern']['depth'] = 0

#only delete
config['dependency']['operations'] = [Delete]
config['dependency']['depth'] = 1

operation, output = solve(df, patterns, models)

print(operation, output)

