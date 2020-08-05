const commandHandler = require('../command/command_handler');

const generatePayment = async (req, res) => {
    const gross_amount = req.body.gross_amount;
    const customer_details = req.body.idAnggota;
    const item = req.body.item_details;
    console.log(item)
    const paymentParam = {
        gross_amount : gross_amount,
        item_details : item,
        idAnggota : customer_details
    }

    res.send( await commandHandler.getPayment(paymentParam) )
}

const updateStatusPayment = async (req, res) => {
    const idPayment = req.query.idPayment;
    console.log('ID Payment : ', idPayment);
    const updatedData = {
        'isPaid' : true,
        'updatedAt' : new Date()
    }
    res.send( await commandHandler.updatePayment(idPayment, updatedData))
}

module.exports = {
    generatePayment,
    updateStatusPayment
}
