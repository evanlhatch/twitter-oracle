import express from "express";
import bodyParser from "body-parser"
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import abi from './utils/FluxPriceFeed.json';
import { ethers } from "ethers";
import { Wallet, providers } from "ethers";

// create express app
const app = express();

const contractAddress = "0x0325375dBbe481B74A0B7F3928799f449E6dC1C9";
const contractABI = abi.abi;

let latestTweet = "Haven't received a tweet yet!";

// create application/json parser
let jsonParser = bodyParser.json()

const __filename = fileURLToPath(import.meta.url);
const myDirname = dirname(__filename);
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(myDirname, 'client/build')));

// receive tweet in post request
app.post("/tweetOracle", jsonParser, async (req, res) => {

  // read received tweet from post
  const rxTweet = req.body.tweet;

  latestTweet = rxTweet;
  const tweetInt = parseInt(rxTweet, 10);

  const provider = new providers.AlchemyProvider("rinkeby", "5uM-cYj4vmhm9XYDA2-YQDIW1Ezn7oyv")
  const wallet = new Wallet("39d383785c392038a7a618e2bbdd9cd0a570d1cc8bc718b32ff19556ca1838fe");
  const signer = wallet.connect(provider);

  const FluxPriceFeedContract = new ethers.Contract(contractAddress, contractABI, signer);
  const contractResult = await FluxPriceFeedContract.transmit(tweetInt);
  console.log(contractResult)

  // send tweet received
  const result = "success, received: " + rxTweet;
  res.send(result)
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/latestTweet", (req, res) => {
  res.json({ message: latestTweet });
});

app.get("/latestPrice", async (req, res) => {
  const provider = new providers.AlchemyProvider("rinkeby", "5uM-cYj4vmhm9XYDA2-YQDIW1Ezn7oyv")
  const wallet = new Wallet("39d383785c392038a7a618e2bbdd9cd0a570d1cc8bc718b32ff19556ca1838fe");
  const signer = wallet.connect(provider);

  const FluxPriceFeedContract = new ethers.Contract(contractAddress, contractABI, signer);
  const latestAnswer = await FluxPriceFeedContract.latestAnswer();
  const convertedVal = parseInt(latestAnswer._hex, 16);
  
  res.json({ message: convertedVal });
});

app.get("/transmit", async (req, res) => {
  const provider = new providers.AlchemyProvider("rinkeby", "5uM-cYj4vmhm9XYDA2-YQDIW1Ezn7oyv")
  const wallet = new Wallet("39d383785c392038a7a618e2bbdd9cd0a570d1cc8bc718b32ff19556ca1838fe");
  const signer = wallet.connect(provider);

  const FluxPriceFeedContract = new ethers.Contract(contractAddress, contractABI, signer);
  const result = await FluxPriceFeedContract.transmit(4206942069);
  console.log(result)
  res.json({ message: result });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const myDirname = dirname(__filename);
  res.sendFile(path.resolve(myDirname, 'client/build', 'index.html'));
});
  
// start the server listening for requests
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running...")
});
