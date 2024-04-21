import string
from nltk.corpus import stopwords
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import numpy as np
import pandas as pd
import re
import nltk
from nltk.util import pr
stemmer = nltk.SnowballStemmer('english')
stopword = set(stopwords.words('english'))
app = FastAPI()


# Define data cleaning function


def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<.*?>+', '', text)
    text = re.sub(r'[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub(r'\n', '', text)
    text = re.sub(r'\w*\d\w*', '', text)
    text = [word for word in text.split(' ') if word not in stopword]
    text = " ".join(text)
    return text

# Define FastAPI request model


class ScoringItem(BaseModel):
    text: str


# Load dataset
df = pd.read_csv(
    './labeled_data.csv')
# df['labels']=df['class'].map({0:'hate speech detected',1:'offensive language detected',2:'no hate and offensive languag'})
# df.head(15)
df = df[['tweet', 'class']]
df['tweet'] = df['tweet'].apply(clean_text)
# X = np.array(df['tweet'])
# y = np.array(df['class'])
x = np.array(df['tweet'])
y = np.array(df['class'])
cv = CountVectorizer()
x = cv.fit_transform(x)
X_train, X_test, y_train, y_test = train_test_split(
    x, y, test_size=0.33, random_state=42)
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)

# Initialize CountVectorizer
# cv = CountVectorizer()
# X = cv.fit_transform(X)
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.33, random_state=42)

# # Train Decision Tree Classifier
# clf = DecisionTreeClassifier()
# clf.fit(X_train, y_train)

# Define FastAPI endpoint


@app.post('/')
async def scoring_endpoint(item: ScoringItem):
    print(item)
    text_vectorized = cv.transform([item.text]).toarray()
    prediction = clf.predict(text_vectorized)
    return {"prediction": prediction.tolist()}
