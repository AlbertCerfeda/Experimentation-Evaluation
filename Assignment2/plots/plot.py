# import pymongo

# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# mydb = myclient["Experimentation2"]

import json
from turtle import width
import pandas 
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

NUM_TEST=14

# Opening JSON file
f = open('Tests.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
average_time_programmer = 0
average_time_non_programmer = 0
correctness_programmers = 0
correctness_non_programmers = 0
for i in range(len(data)):
    is_programmer_i = data[i]["data"]["programmer"]
    # tests_participant_i = data[i]["stats"]["realtest"]["tests"]
    j = 0
    while j < NUM_TEST:
        elapsedTime_test_j = data[i]["stats"]["realtest"]["tests"][j]["elapsed"]
        correctness_test_j = data[i]["stats"]["realtest"]["tests"][j]["correct"]
        j += 1
        if (is_programmer_i):
            average_time_programmer += int(elapsedTime_test_j)
            if (correctness_test_j):
                correctness_programmers += 1
        else:
            average_time_non_programmer += int(elapsedTime_test_j)
            if (correctness_test_j):
                correctness_non_programmers += 1

average_time_programmer = average_time_programmer / (NUM_TEST * len(data))
average_time_non_programmer = average_time_non_programmer / (NUM_TEST * len(data))
correctness_programmers = (correctness_programmers / (NUM_TEST * len(data))) * 100
correctness_non_programmers = (correctness_non_programmers / (NUM_TEST * len(data))) * 100

plot = sns.barplot(x = ["Programmers", "Non-Programmers"], y = [average_time_programmer, average_time_non_programmer])
plot.set(xlabel = "Programmer Status", ylabel = "Average Time (s)")
plt.title("Average Time Time")
plt.savefig("Global Average Time.png")
plt.close()

plot1 = sns.barplot(x = ["Programmers", "Non-Programmers"], y = [correctness_programmers, correctness_non_programmers])
plt.ylim(0, 100)
plot1.set(xlabel = "Programmer Status", ylabel = "Average Correctness (%)")
# sns.histplot(data=data, x="", hue="correct", discrete=True, multiple="stack", palette={True:'green',False:'red'})
plt.title("Average Correctness")
plt.savefig("Global Average Correctness.png")
plt.close()


# return stats per single test

tests_times_programmer = []
tests_times_non_programmer = []
tests_correctness_programmer = []
tests_correctness_non_programmer = []

id = 0
while id < NUM_TEST:
    time_programmer = 0
    time_non_programmer = 0

    correctness_p = 0
    correctness_non_p = 0
    for i in range(len(data)):
        is_programmer_i = data[i]["data"]["programmer"]
        elapsedTime_test_id = data[i]["stats"]["realtest"]["tests"][id]["elapsed"]

        correctness_test_id = data[i]["stats"]["realtest"]["tests"][id]["correct"]
        if (is_programmer_i):
            time_programmer += int(elapsedTime_test_id)
            if (correctness_test_id):
                correctness_p += 1
        else:
            time_non_programmer += int(elapsedTime_test_id)
            if (correctness_test_id):
                correctness_non_p += 1
    time_non_programmer = time_non_programmer / (len(data))
    time_programmer = time_programmer / (len(data))

    correctness_p = (correctness_p / (len(data))) * 100
    correctness_non_p = (correctness_non_p / (len(data))) * 100

    tests_times_programmer.append(time_programmer)
    tests_times_non_programmer.append(time_non_programmer)

    tests_correctness_programmer.append(correctness_p)
    tests_correctness_non_programmer.append(correctness_non_p)

    id += 1

labels = list(range(1,NUM_TEST+1))

x = np.arange(len(labels))  # the label locations
width = 0.35  # the width of the bars

fig, ax = plt.subplots()
rects1 = ax.bar(x - width/2, tests_times_programmer, width, label='Programmer')
rects2 = ax.bar(x + width/2, tests_times_non_programmer, width, label='Non-Programmer')

ax.set_ylabel('Average time')
ax.set_xlabel('Test number')
ax.set_title('Average time between programmers and non programmers')
ax.set_xticks(x, labels)
ax.legend()

# ax.bar_label(rects1, padding=3)
# ax.bar_label(rects2, padding=3)

fig.tight_layout()

plt.savefig("Average Time programmers byTest.png")
plt.close()

fig, ax = plt.subplots()
rects1 = ax.bar(x - width/2, tests_correctness_programmer, width, label='Programmer')
rects2 = ax.bar(x + width/2, tests_correctness_non_programmer, width, label='Non-Programmer')

ax.set_ylabel('Average correctness')
ax.set_xlabel('Test number')
ax.set_title('Average Correctness between programmers and non programmers')
ax.set_xticks(x, labels)
ax.legend()

# ax.bar_label(rects1, padding=3)
# ax.bar_label(rects2, padding=3)

fig.tight_layout()

plt.savefig("Average Correctness programmers byTest.png")
plt.close()

# Closing file
f.close()



# Average Completion Time by Gender
completionTimesMale =   [ [] for x in range(NUM_TEST) ]
completionTimesFemale = [ [] for x in range(NUM_TEST) ]

for i in range(len(data)):
    is_male = data[i]["data"]['gender'] == 'Male'
    j = 0
    print("Participant ",i+1)
    while (j < NUM_TEST):
        if is_male:
            completionTimesMale[j].append(int(data[i]["stats"]["realtest"]["tests"][j]["elapsed"]))
        else:
            completionTimesFemale[j].append(int(data[i]["stats"]["realtest"]["tests"][j]["elapsed"]))
        j += 1


completionTimesMale = [float(f'{(sum(x) / len(x)):8.2f}') for x in completionTimesMale]
completionTimesFemale = [float(f'{(sum(x) / len(x)):8.2f}') for x in completionTimesFemale]

labels = list(range(1,1+NUM_TEST))

x = np.arange(len(labels))  # the label locations
width = 0.35  # the width of the bars

fig, ax = plt.subplots()
rects1 = ax.bar(x - width/2, completionTimesMale, width, label='Male')
rects2 = ax.bar(x + width/2, completionTimesFemale, width, label='Female')

ax.set_ylabel('Average Completion Time')
ax.set_title('Average Completion Time by gender')
ax.set_xticks(x, labels)
ax.legend()

# ax.bar_label(rects1, padding=3)
# ax.bar_label(rects2, padding=3)

fig.tight_layout()

plt.savefig("Average Time byGender.png")
