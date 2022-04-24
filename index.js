import express from "express";
import bodyParser from "body-parser"
import { Wallet, providers } from "ethers";
import path from "path";

// create express app
const app = express();

// create application/json parser
let jsonParser = bodyParser.json()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// define the first route
app.get("/", async (req, res) => {
  res.send("Home")
})

// receive tweet in post request
app.post("/tweetOracle", jsonParser, async (req, res) => {

  // read received tweet from post
  const rxTweet = req.body.tweet;

    // send tweet received
  const result = "success, received: " + rxTweet;
  res.send(result)
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
  
// start the server listening for requests
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running...")
});
