const express = require(`express`)
const db = require(`./db`)
const utils = require(`./utils`)

const router = express.Router()

router.get(`/`,(request, response) => {
    const connection = db.connect()
    const statement = `select * from approvedLoan`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.get('/:acc_no',(request,response)=>{
    const {acc_no}=request.params
    const connection=db.connect()
    const statement=`select * from approvedLoan where acc_no='${acc_no}'`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.post(`/`, (request, response) => {
    const {acc_no, loan_amount,type_id,status_id, interest_rate, no_of_EMI, EMI_amount} = request.body
    
    const connection = db.connect()
    const statement = `insert into approvedLoan (acc_no, loan_amount,type_id,status_id, interest_rate, no_of_EMI, EMI_amount) values(${acc_no}, '${loan_amount}',${type_id},${status_id},${interest_rate},${no_of_EMI},${EMI_amount})`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
} )

router.put('/:acc_no', (request, response) => {
    const {acc_no} = request.params
    const {loan_amount, interest_rate, status_id , no_of_EMI, EMI_amount} = request.body

    const statement = `update approvedLoan set EMI_amount = ${EMI_amount}, no_of_EMI = ${no_of_EMI} ,interest_rate = ${interest_rate}, loan_amount = ${loan_amount}, status_id = ${status_id} where acc_no = ${acc_no}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:acc_no', (request, response) => {
    const {acc_no} = request.params

    const connection = db.connect()
    const statement = `delete from approvedLoan where acc_no = ${acc_no}`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router