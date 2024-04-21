from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import json
from sklearn.feature_extraction.text import CountVectorizer

app = FastAPI()


class ScroingItem(BaseModel):
    text: str


with open('decision_tree_model.pkl', 'rb')as f:
    model = pickle.load(f)

cv = CountVectorizer()


@app.post('/')
async def scoring_endpoint(item: ScroingItem):
    res = cv.transform([item.text]).toarray()
    print(item.text)
    return model.predict(res)
