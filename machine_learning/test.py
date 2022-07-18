import pandas as pd
import numpy as np
import joblib
import random
import time
trained_model = joblib.load("../machine_learning/model/LogisticRegression_model.pkl")


def predict(data):
    predictions = trained_model.predict(data)

    return predictions


# age = float(input('Age: '))
# gender = float(input('Sex (0-female | 1-male): '))


def generate_data():
    age = random.randint(20, 90)
    gender = random.randint(0, 1)
    RestingBP = random.uniform(0, 200)
    Cholesterol = random.uniform(0, 603)
    FastingBS = random.randint(0, 1)
    MaxHR = random.uniform(60, 202)
    ExerciseAngina = random.randint(0, 1)
    Oldpeak = random.uniform(-2.6, 6.2)
    Chest_ASY = random.randint(0, 1)
    Chest_ATA = random.randint(0, 1 - Chest_ASY)
    Chest_NAP = random.randint(0, 1 - Chest_ASY - Chest_ATA)
    Chest_TA = 1 - (Chest_ASY + Chest_ATA + Chest_NAP)
    ECG_LVH = random.randint(0, 1)
    ECG_Normal = random.randint(0, 1 - ECG_LVH)
    ECG_ST = 1 - (ECG_LVH + ECG_Normal)
    ST_Slope_Down = random.randint(0, 1)
    ST_Slope_Flat = random.randint(0, 1 - ST_Slope_Down)
    ST_Slope_Up = 1 - (ST_Slope_Down + ST_Slope_Flat)

    data = [age, gender, RestingBP, Cholesterol, FastingBS, MaxHR, ExerciseAngina, Oldpeak, Chest_ASY,	Chest_ATA,
            Chest_NAP,	Chest_TA, ECG_LVH, ECG_Normal, ECG_ST, ST_Slope_Down, ST_Slope_Flat, ST_Slope_Up]

    return data


i = 1
try:
    while(True):
        # data = [age, gender]
        generated_data = generate_data()
        # data.extend(generated_data)

        ytest = pd.DataFrame(np.reshape(generated_data, (1, 18)))
        ytest.columns = ['Age', 'Sex', 'RestingBP', 'Cholesterol', 'FastingBS', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ChestPainType_ASY',	'ChestPainType_ATA',
                         'ChestPainType_NAP',	'ChestPainType_TA', 'RestingECG_LVH', 'RestingECG_Normal', 'RestingECG_ST', 'ST_Slope_Down', 'ST_Slope_Flat', 'ST_Slope_Up']
        result = predict(ytest)[0]
        print('Predict', i, ':', result)
        i += 1
        time.sleep(3)
except KeyboardInterrupt:
    print('Finished prediction!')
