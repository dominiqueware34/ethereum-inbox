const path = require('path');
const fs = require('fs');
const solc = require('solc')
const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// compile function source = source code of .sol file and number of contractions
module.exports = solc.compile(source, 1).contracts[':Inbox'];
