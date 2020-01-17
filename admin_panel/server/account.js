const express = require(`express`)
const db = require(`./db`)
const utils = require(`./utils`)

const router = express.Router()

router.get(`/`,(request, response) => {
    const connection = db.connect()
    const statement = `select a.sr_no,a.acc_no,a.acc_holder_name,t.acc_type,a.acc_balance,a.acc_open_date,s.acc_status,l.loan_type from account a inner join acc_type t on (a.type_id=t.type_id) inner join acc_status s on (a.status_id=s.status_id) inner join loan_type l on (a.loan_type=l.type_id)`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.get('/:acc_no',(request,response)=>{
    const {acc_no}=request.params
    const connection=db.connect()
    const statement=`select * from account where acc_no='${acc_no}'`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.post(`/`, (request, response) => {
    const {sr_no, acc_no, acc_holder_name,type_id,acc_balance,acc_open_date,status_id,loan_type} = request.body
    
    const connection = db.connect()
    const statement = `insert into account values(${sr_no}, ${acc_no}, '${acc_holder_name}',${type_id},${acc_balance},'${acc_open_date}',${status_id},${loan_type})`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
} )

router.put('/:acc_no', (request, response) => {
    const {acc_no} = request.params
    const {type_id,acc_balance,status_id} = request.body

    const statement = `update account set type_id = ${type_id}, acc_balance = ${acc_balance}, status_id = ${status_id} where acc_no = ${acc_no}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/withdrawBal/:acc_no', (request, response) => {
    const {acc_no} = request.params
    const {acc_bal, amount} = request.body

    const statement = `update account set acc_balance = ${acc_bal} - ${amount} where acc_no = ${acc_no}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/depositBal/:acc_no', (request, response) => {
    const {acc_no} = request.params
    const {acc_bal, amount} = request.body

    const statement = `update account set acc_balance = ${acc_bal} + ${amount} where acc_no = ${acc_no}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/fundTransferBal/:acc_no', (request, response) => {
    const {benificiaryAccNo, benificiaryAccHolderName, amount} = request.body
    const connection = db.connect()
    var benAccBal 
    const statement=`select * from account where acc_no='${benificiaryAccNo}'`
    connection.query(statement,(error,data)=>{
        benAccBal = data[0].acc_balance
       
        const statement1 = `update account set acc_balance = ${benAccBal} + ${amount} where acc_no = ${benificiaryAccNo} and acc_holder_name = '${benificiaryAccHolderName}' `
        connection.query(statement1, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        })
    })
})

router.delete('/:acc_no', (request, response) => {
    const {acc_no} = request.params

    const connection = db.connect()
    const statement = `delete from account where acc_no = ${acc_no}`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router