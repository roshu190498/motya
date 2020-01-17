const express = require(`express`)
const db = require(`./db`)
const utils = require(`./utils`)

const router = express.Router()

router.get(`/`,(request, response) => {
    const connection = db.connect()
    const statement = `select * from trans_type`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post(`/`, (request, response) => {
    const {tran_type} = request.body
    
    const connection = db.connect()
    const statement = `insert into trans_type (tran_type) value ('${tran_type}')`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
} )

router.put('/:id', (request, response) => {
    const {id} = request.params
    const {tran_type} = request.body

    const statement = `update trans_type set tran_type = '${tran_type}' where type_id = ${id}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:id', (request, response) => {
    const {id} = request.params

    const connection = db.connect()
    const statement = `delete from trans_type where type_id = ${id}`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router