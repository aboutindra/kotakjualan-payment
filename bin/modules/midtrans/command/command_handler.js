const commands = require('./command');
const Commands = new commands();

const getPayment = (param) => {
    return Commands.createPayment(param);
}

const updatePayment = async (idPayment, statusPayment) => {
    return Commands.updateStatusPayment(idPayment, statusPayment)
}

module.exports = {
    getPayment,
    updatePayment
};
