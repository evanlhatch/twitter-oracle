# 🔮 ETH Twitter Oracle
This project shows the latest price for ethereum but in a unique way. We provide the price from an oracle that is validated from people's tweets! 🐦

## 📖 How it works:
Oracles need validators for their data. We decided to see if twitter posts could work as validators. So when a verified twitter account tweets the price of ethereum, we update our price oracle. <br> 

We used the Flux protocol First Party Oracle (FPO) as our price oracle for ETH / USD. From there, we used make.com to send an HTTP POST request everytime a specified user tweets the price of ethereum. That HTTP post request is sent to a node.js express server we have running on Heroku which thens calls our FPO smart contract to update our oracle with the latest price from the tweet. We also have a front end in react that calls our FPO smart contract to read the latest price from our oracle and display it on a web page!

## 🔥 Usage
### install
`npm install` <br>
`cd client` <br>
`npm install`

### run web app
`npm start`

### run express server
`cd ..` <br>
`npm start`

## 💻 Oracle code
For more information on the oracle smart contract, go to oracle/fpo-evm, or [here](https://github.com/Manifest-Git/twitter-oracle/tree/master/oracle/fpo-evm)