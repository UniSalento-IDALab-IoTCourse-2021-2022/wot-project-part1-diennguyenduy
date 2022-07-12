import joblib


def predict_price(data):

    trained_model = joblib.load("model/LogisticRegression_model.pkl")
    predictions = trained_model.predict(data)

    return predictions
