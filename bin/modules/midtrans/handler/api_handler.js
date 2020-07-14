const commandHandler = require('../command/command_handler');

const generateTransaction = async (req, res) => {
    res.send( await commandHandler.getTransaction(req.body.param) )
}

module.exports = {
    generateTransaction
}