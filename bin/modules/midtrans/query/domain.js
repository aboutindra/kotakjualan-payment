const query = require('../query/query');
const db = require('../../../utils/database/mongodb/connection');

class Domain{

    constructor(db) {
        this.query = new query(db);
    }

    async insertPayment(paymentParam){
        let status;
        const insertPayment = await this.query.insertPayment(paymentParam);
        if(insertPayment.result.ok === 1){
            status = {
                'code' : 200,
                'message' : 'Payment Succesfuly inserted!'
            }
        } else {
            status = {
                'code' : 500,
                'message' : 'Something went wrong while inserting!'
            }
        }
        return status;
    }

    async updatePayment(idPayment ,updatedParam){
        let status;
        const updatePayment = await this.query.updatePayment(idPayment, updatedParam);
        console.log("\n\nUpdate Payment : ", updatePayment.result)
        if(updatePayment.result.nModified === 1 && updatePayment.result.ok === 1){
             status = {
                'code' : 200,
                'message' : 'Payment Succesfuly updated!'
            }
        } else if(updatePayment.result.ok === 0){
            console.log('2')
             status = {
                'code' : 500,
                'message' : 'Something went wrong while updating!'
            }
        } else if(updatePayment.result.nModified === 0 && updatePayment.result.n === 1){
            console.log('3')
             status = {
                'code' : 200,
                'message' : 'Already updated!'
            }
        } else if(updatePayment.result.n === 0){
            status = {
                'code' : 404,
                'message' : 'Not found!'
            }
        }
        console.log("Status : ",status)
        return status
    }

    async find(idPayment){
        let status;
        const findAll = await this.query.findAllPayment(idPayment);
        return findAll;
    }

}
module.exports = Domain;
