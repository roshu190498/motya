const express = require(`express`)
const db = require(`./db`)
const utils = require(`./utils`)

const router = express.Router()

router.get(`/`,(request, response) => {
    const connection = db.connect()
    const statement = `select * from loan`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.get('/:acc_no',(request,response)=>{
    const {acc_no}=request.params
    const connection=db.connect()
    const statement=`select * from loan where acc_no='${acc_no}'`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.post(`/`, (request, response) => {
    const {acc_no, loan_acc_no, loan_amount, type_id, status_id} = request.body
    
    const connection = db.connect()
    const statement = `insert into loan (acc_no, loan_amount, type_id, status_id) values(${acc_no}, ${loan_amount}, ${type_id},${status_id})`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
} )

router.put('/:id', (request, response) => {
    const {id} = request.params
    const {loan_amount, type_id, status_id} = request.body

    const statement = `update loan set loan_amount = ${loan_amount}, type_id = ${type_id}, status_id = ${status_id} where loan_id = ${id}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:id', (request, response) => {
    const {id} = request.params

    const connection = db.connect()
    const statement = `delete from loan where loan_id = ${id}`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router