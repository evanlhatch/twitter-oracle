// Jake Johnson March 2022
//
// Endpoint/website https://test-api-1-jake.herokuapp.com/
//  - To add heroku git: $git remote heroku https://git.heroku.com/test-api-1-jake.git
//  - Set private keys in .env file. Don't git commit .env file. Heroku will automatically
//    add them to heroku app
//  - To push to heroku: $git push heroku master
//  - To run locally: $heroku local web

import express from "express";
import bodyParser from "body-parser"
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Wallet, providers } from "ethers";

// create express app
const app = express();

// create application/json parser
let jsonParser = bodyParser.json()

// function to get NFTs in a collection
const getNftsFromCollection = async() =>
{
  const provider = new providers.AlchemyProvider("maticmum", "DbhFMNZuRkiPvq6C-jiSBuDm2v4WNKPy")
  const sdk = new ThirdwebSDK(provider);
  const contract = sdk.getNFTCollection("0x324be9560D9Edb824f8CCe6e780d0F5720998366");
  const nfts = await contract.getAll();
  return nfts[0].metadata.name;
}

// define the first route
app.get("/", async (req, res) => {
  res.send("Home")
})

// test env variables route
app.get("/envVars", async (req, res) => {
  res.send(process.env.SIGNER_PRIVATE_KEY);
})

// minft NFT route
app.post("/mintNft", jsonParser, async (req, res) => {
  // get POST parameters from body (should be sent in JSON)
  let imageUrl = req.body.imageUrl;
  const name = req.body.name;
  const description = req.body.description;
  const contractAddress = req.body.contractAddress;
  const toAddress = req.body.addressToMintTo;

  // initialize thirdweb sdk
  const provider = new providers.AlchemyProvider("maticmum", "DbhFMNZuRkiPvq6C-jiSBuDm2v4WNKPy")
  const sdk = new ThirdwebSDK(provider);

  // Update signer with private key. Should be stored in .env file
  const wallet = new Wallet(process.env.SIGNER_PRIVATE_KEY);
  const signer = wallet.connect(provider);
  sdk.updateSignerOrProvider(signer);

  // get thirdweb contract
  const contract = sdk.getNFTCollection(contractAddress);

  // If we got an IPFS cid (starts with Qm), add ipfs.io gateway 
  // to get a url for image
  if(imageUrl[0] == "Q" && imageUrl[1] == "m")
  {
    imageUrl = "https://ipfs.io/ipfs/" + imageUrl;
  }

  // define metadata for NFT
  const metadata = {
    name: name,
    description: description,
    image: imageUrl, // This can be an image url or file
  };

  // mint the nft with third web api
  const tx = await contract.mintTo(toAddress, metadata);
  
  // send result of tx
  res.send(tx)
})

// get NFTs from collection route
app.get("/getNftsFromCollection", async (req, res) => {
    const name = await getNftsFromCollection();
    res.send(name)
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...")
});
