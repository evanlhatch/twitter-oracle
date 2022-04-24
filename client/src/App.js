// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import abi from './utils/FluxPriceFeed.json';
import { ethers } from "ethers";
import { Wallet, providers } from "ethers";

function App() {
  const [data, setData] = React.useState(null);

  const contractAddress = "0xe56a1375C38E1E6C754E90f9D9F3775a077B090F";
  const contractABI = abi.abi;

  const getLatest = async() => {
    //const provider = new providers.AlchemyProvider("rinkeby", "5uM-cYj4vmhm9XYDA2-YQDIW1Ezn7oyv")
    //const provider = new providers.AlchemyProvider("maticmum", "DbhFMNZuRkiPvq6C-jiSBuDm2v4WNKPy")
    const provider = new providers.InfuraProvider("rinkeby", "732d6f929b5f495aa0d21e5b8a6d8cb4")
    console.log("provider", provider)

    const wallet = new Wallet("0xF4ED00eEb1Da6a76796b296713FE36c939b3a72e");
    console.log('wallet', wallet)
    const signer = wallet.connect(provider);
    //console.log('singer', signer)
    //const FluxPriceFeedContract = new ethers.Contract(contractAddress, contractABI, signer);
    //const latestAnswer = await FluxPriceFeedContract.latestAnswer();
    //console.log("LATEST ANSWERR: ", latestAnswer);
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>Latest: {!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;