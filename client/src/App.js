// client/src/App.js

import React from "react";
import logo from "./ethereum-eth-logo.png";
import "./App.css";
import abi from './utils/FluxPriceFeed.json';
import { ethers } from "ethers";
import { Wallet, providers } from "ethers";

function App() {
  const [data, setData] = React.useState(null);
  const [latestPrice, setLatestPrice] = React.useState(null);

  const contractAddress = "0x0325375dBbe481B74A0B7F3928799f449E6dC1C9";
  const contractABI = abi.abi;

  const getLatest = async() => {
    const provider = new providers.AlchemyProvider("rinkeby", "5uM-cYj4vmhm9XYDA2-YQDIW1Ezn7oyv")
    //const provider = new providers.AlchemyProvider("maticmum", "DbhFMNZuRkiPvq6C-jiSBuDm2v4WNKPy")
    //const provider = new providers.InfuraProvider("rinkeby", "732d6f929b5f495aa0d21e5b8a6d8cb4");
    const wallet = new Wallet("39d383785c392038a7a618e2bbdd9cd0a570d1cc8bc718b32ff19556ca1838fe");
    const signer = wallet.connect(provider);

    const FluxPriceFeedContract = new ethers.Contract(contractAddress, contractABI, signer);
    const latestAnswer = await FluxPriceFeedContract.latestAnswer();

    const convertedVal = parseInt(latestAnswer._hex, 16);
    console.log(parseInt(convertedVal))
    setLatestPrice(convertedVal);
  }

  React.useEffect(() => {
    fetch("/latestTweet")
      .then((res) => res.json())
      .then((data) => setData(data.message));

      getLatest();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🐦 Welcome to the ETH Twitter Oracle </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>🔮 ETH Latest Price: {!latestPrice ? "Loading..." : latestPrice}</p>
        {/*
        <p>Latest Tweet: {!data ? "Loading..." : data}</p>
        */}
        <a href="https://github.com/Manifest-Git/twitter-oracle">Find out more</a>

      </header>
    </div>
  );
}

export default App;