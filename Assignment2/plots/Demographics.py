import json
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import json
from turtle import width
import pandas 

NUM_TEST=14
# Opening JSON file
f = open('Tests.json')


data = json.load(f)




### Demographics

programmers_male =   0
programmers_female = 0
nonprogrammers_male = 0
nonprogrammers_female = 0


for i in range(len(data)):
    
    is_male = data[i]["data"]['gender'] == 'Male'
    if data[i]["data"]['programmer']:
        if is_male:
            programmers_male +=1
        else:
            programmers_female +=1
    else:
        if is_male:
            nonprogrammers_male +=1
        else:
            nonprogrammers_female +=1



labels = [ "Programmers", "Non-programmers" ]

x = np.arange(len(labels))  # the label locations
width = 0.35  # the width of the bars

fig, ax = plt.subplots()
rects1 = ax.bar(x - width/2, [ programmers_male, nonprogrammers_male ], width, label='Male')
rects2 = ax.bar(x + width/2, [ programmers_female, nonprogrammers_female], width, label='Female')

ax.set_ylabel('Count')
ax.set_title('Demographics of our partecipants')
ax.set_xticks(x, labels)
ax.legend()

ax.bar_label(rects1, padding=3)
ax.bar_label(rects2, padding=3)

fig.tight_layout()

plt.savefig("Demographics.png")
