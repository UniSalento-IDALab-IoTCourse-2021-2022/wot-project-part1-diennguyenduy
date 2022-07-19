import joblib


def predict_hf(data):

    trained_model = joblib.load("model/model.pkl")
    predictions = trained_model.predict(data)

    return predictions
