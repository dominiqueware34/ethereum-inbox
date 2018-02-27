const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const pnu = require('./pneum') // contains public and private key
const newtworkLink = 'https://rinkeby.infura.io/ZriNmf2O9MPOKT47u0iO'
// set up HDWalletProvider
const provider = new HDWalletProvider(pnu,newtworkLink);

const web3 = new Web3(provider);

const deploy = async ()=>{
    const [ account, ...accounts ] = await web3.eth.getAccounts()


    console.log('Deploying account', account)

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hi there friend! :) Welcome to the blockchain world']
        })
        .send({
            gas: '1000000',
            from: account
        })
    
    console.log('Deployed to', result.options.address)
}

deploy();