from flask import Flask, request, render_template
import pandas as pd
import numpy as np
import json
import joblib
import random
import utils


app = Flask(__name__)


class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


@app.route('/predict', methods=['POST'])
def predict():
    rev_object = request.get_json()
    # i = 1
    # try:
    # while(True):
    # data = [age, gender]
    # generated_data = generate_data()
    # data.extend(generated_data)

    # Data variable contains the
    # data from the node server
    data = rev_object['array']
    print('Data: ', data)

    ytest = pd.DataFrame(np.reshape(data, (1, 18)))
    ytest.columns = joblib.load("model/lgr_columns.pkl")
    predicted = utils.predict_hf(ytest)[0]
    print(predicted)

    # print('Predict', i, ':', result)
    # i += 1
    # time.sleep(3)
    return json.dumps({"result": predicted}, cls=NpEncoder)
    # except KeyboardInterrupt:
    #     print('Finished prediction!')


if __name__ == "__main__":
    app.run(port=5000)
