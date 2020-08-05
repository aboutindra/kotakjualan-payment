const Con = require('../../../utils/database/mongodb/connection');

class Query{

    constructor() {
        this.con = new Con();
    }

    async insertPayment(paymentParam){
        let param = {
            'type' : 'insertOne',
            'data' : paymentParam
        }
        const insertStatus = await this.con.getConnection('PaymentHistory', param);
        return insertStatus;
    }

    async updatePayment(idPayment, updatedData){
        let param = {
            'type' : 'updateOne',
            'data' : {
                'idPayment' : idPayment,
                ...updatedData
            }
        }
        const updateStatus = await this.con.getConnection('PaymentHistory', param)
        return updateStatus
    }

    async findAllPayment(idPayment){
        const findAllPaymentData = await this.db.find({idPayment : idPayment});
        return findAllPaymentData
    }

}

module.exports = Query;
