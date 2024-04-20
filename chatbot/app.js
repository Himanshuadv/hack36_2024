const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = 5000;
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

app.listen((port = PORT), () => {
  console.log(`port is working on ${port}`);
});
