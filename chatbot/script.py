import pickle
import sys
import json

# Load the pickled model
with open('hack36_2024\chatbot\decision_tree_model.json\decision_tree_model.json', 'rb') as f:
    model = pickle.load(f)

# Get input data from Node.js as command-line arguments
input_data = json.loads(sys.argv[1])

# Perform prediction using the model
prediction = model.predict(input_data)

# Print the prediction to stdout
print(prediction)
