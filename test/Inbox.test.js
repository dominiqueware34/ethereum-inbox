const assert = require('assert')
const ganache = require('ganache-cli') // local ethereum network
const Web3 = require('web3'); // constructor to make instances 
const { interface, bytecode } = require('../compile')


// need to pass Web3 a provide (i.e. the network type: rinkbey etc)
const provider = ganache.provider();
const web3 = new Web3(provider);
 

let accounts, inbox;
const INTIAL_STR = 'Hi there!'

beforeEach(async ()=>{
    // get list of all accounts
    accounts = await web3.eth.getAccounts()

    // use one account to deploy contract
   inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode, // bytecode from contract
        arguments: ['Hi there!'] // params for constructo function of constructor
    })
    .send({
        from: accounts[0],
        gas: '1000000'

    });

    inbox.setProvider(provider);
    
})

describe('Inbox', ()=>{
    it('deploys a contract', ()=>{
        assert.ok(inbox.options.address) // check to see if contract has address prop
    })

    it('has default message',async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, INTIAL_STR)
    })

    it('can change the message', async ()=>{
        // modifies contracts data
        // need to send trx 
        await inbox.methods
        .setMessage('Hi dom')
        .send({ from: accounts[0] }); // returns transaction hash not actual message

        // retrieve message after transaction is complete
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi dom')
    })
    
})

