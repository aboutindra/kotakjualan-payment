const commands = require('./command');
const Commands = new commands();

const getPayment = (param) => {
    return Commands.createPayment(param);
}

const updatePayment = async (idPayment, statusPayment) => {
    console.log("Command Handler : ", await Commands.updateStatusPayment(idPayment, statusPayment))
    return Commands.updateStatusPayment(idPayment, statusPayment)
}

module.exports = {
    getPayment,
    updatePayment
};
