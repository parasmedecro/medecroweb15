import pickle as pk
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from flask import Flask, request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})

loaded_model = None

with open('./Resources/ml_model.pkl', 'rb') as file:
    loaded_model = pk.load(file)

symptoms = pd.read_csv('./Resources/Training.csv')

features = symptoms.columns.tolist()[:-2]

# X = symptoms[features]
# Y = symptoms['prognosis']
# model = RandomForestClassifier()
# model.fit(X,Y)
# with open('./Resources/ml_model.pkl', 'wb') as file:
#     pk.dump(model, file)
# print(features,len(features))

@app.route('/symptoms', methods=['GET'])
def get_symptoms():
    return jsonify({'symptoms': features})

@app.route('/predict',methods=['POST'])
def predict():
    datas = request.json.get('data')
    input_df = pd.DataFrame([datas], columns=features)

    # print(loaded_model.predict(input_df))
    return jsonify({'prediction':loaded_model.predict(input_df).tolist()})
    # return jsonify({'prediction':''})


if __name__=="__main__":
    app.run(debug=True)