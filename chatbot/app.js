const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const express = require("express");
const fs = require("fs");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const PORT = 5000;
// const { DecisionTreeClassifier } = require("scikit-learn");
const tf = require("@tensorflow/tfjs");
const sk = require("scikitjs");
const { PorterStemmer, WordTokenizer } = require("natural");

const { DecisionTreeClassifier, setBackend } = require("scikitjs");
sk.setBackend(tf);
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.post("/send-msg", (req, res) => {
  console.log(req);
  runSample(req.body.query).then((data) => res.send({ reply: data }));
});
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
const sessionId = uuid.v4();
async function runSample(msg = "hey", projectId = "hello-bdhm") {
  // A unique identifier for the given session

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./chatCredential.json",
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log("  No intent matched.");
  }
  return result.fulfillmentText;
}
// runSample();
/// making the hate speech funciton

// Load the JSON model file
const modelData = fs.readFileSync("./decision_tree_model.json");
const modelInfo = JSON.parse(modelData);
// Recreate the model from the JSON data
const clf = new DecisionTreeClassifier(modelInfo.params);
clf.tree_ = modelInfo.tree;
// Preprocessing function (assuming 'clean' function is defined)
function clean(text) {
  // Implement your preprocessing logic here
  // Convert text to lowercase
  text = text.toLowerCase();

  // Remove square brackets and content inside them
  text = text.replace(/\[.*?\]/g, "");

  // Remove URLs
  text = text.replace(/https?:\/\/\S+/g, "");

  // Remove HTML tags
  text = text.replace(/<.*?>/g, "");

  // Remove punctuation
  text = text.replace(/[^\w\s]|_/g, "");

  // Remove digits
  text = text.replace(/\d+/g, "");

  // Remove newline characters
  text = text.replace(/\n/g, "");

  // Remove leading and trailing whitespaces
  text = text.trim();

  return text;
}

// function countVectorizer(text) {
//   // Tokenize the text
//   const tokenizer = new WordTokenizer();
//   const tokens = tokenizer.tokenize(text);

//   // Stem the tokens
//   const stemmer = PorterStemmer;
//   const stemmedTokens = tokens.map((token) => stemmer.stem(token));

//   // Count the occurrences of each token
//   const counts = {};
//   stemmedTokens.forEach((token) => {
//     counts[token] = (counts[token] || 0) + 1;
//   });

//   return counts;
// }

// const cv = new CountVectorizer();
app.use("/predict", (req, res) => {
  const textData = req.body.test;

  const preprocessedText = clean(textData);
  const result = countVectorizer(preprocessedText);
  const prediction = clf.predict(result);

  // Send the prediction result back to the client
  res.json({ prediction: prediction });
});
app.listen((port = PORT), () => {
  console.log(`port is working on ${port}`);
});
