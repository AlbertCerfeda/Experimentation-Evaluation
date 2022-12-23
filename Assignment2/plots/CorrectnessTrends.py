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




### Correctness By Test

correct =   [0] * NUM_TEST
incorrect = [0] * NUM_TEST
for i in range(len(data)):
    j = 0
    
    while j <= 13:
        if data[i]["stats"]["realtest"]["tests"][j]["correct"]:
            correct[j] +=1
        else:
            incorrect[j] += 1
        j+=1



plot = sns.barplot(x = list(range(1,1+NUM_TEST)), y = [float(f'{(x / NUM_TEST):8.2f}') for x in correct])
plt.xlim(-1,14)
plt.ylim(0, 1)
plot.set(xlabel = "Test number", ylabel = "Correct answers")

plt.title("Average correctness by test")
plt.savefig("Average Correctness ByTest.png")
plt.close()


### Correctness By Gender
correctMale =   [0] * NUM_TEST
numMale = 0
correctFemale = [0] * NUM_TEST
numFemale = 0

for i in range(len(data)):
    is_male = data[i]["data"]['gender'] == 'Male'
    if is_male:
        numMale+=1
    else:
        numFemale+=1
    j = 0
    
    while j <= NUM_TEST-1:
        if data[i]["stats"]["realtest"]["tests"][j]["correct"]:
            if is_male:
                correctMale[j] +=1
            else:
                correctFemale[j] +=1
        j+=1

correctMale = [float(f'{(x / numMale):8.2f}') for x in correctMale]
correctFemale = [float(f'{(x / numFemale):8.2f}') for x in correctFemale]

labels = list(range(1,1+NUM_TEST))

x = np.arange(len(labels))  # the label locations
width = 0.35  # the width of the bars

fig, ax = plt.subplots()
rects1 = ax.bar(x - width/2, correctMale, width, label='Male')
rects2 = ax.bar(x + width/2, correctFemale, width, label='Female')

ax.set_ylabel('Correct Answers')
ax.set_title('Average Gender Correctness for each test')
ax.set_xticks(x, labels)
ax.legend()

# ax.bar_label(rects1, padding=3)
# ax.bar_label(rects2, padding=3)

fig.tight_layout()

plt.savefig("Average Correctness byGender.png")


print(correct)
print(incorrect)
