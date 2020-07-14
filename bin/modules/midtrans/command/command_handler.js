const commands = require('./command');
const Commands = new commands();

const getTransaction = (param) => {
    Commands.createTransaction(param);
}

module.exports = {
    getTransaction
};