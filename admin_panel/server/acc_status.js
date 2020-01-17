const express = require(`express`)
const db = require(`./db`)
const utils = require(`./utils`)

const router = express.Router()

router.get(`/`,(request, response) => {
    const connection = db.connect()
    const statement = `select * from acc_status`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post(`/`, (request, response) => {
    const {acc_status} = request.body
    
    const connection = db.connect()
    const statement = `insert into acc_status (acc_status) value ('${acc_status}')`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
} )

router.put('/:id', (request, response) => {
    const {id} = request.params
    const {acc_status} = request.body

    const statement = `update acc_status set acc_status = '${acc_status}' where status_id = ${id}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:id', (request, response) => {
    const {id} = request.params

    const connection = db.connect()
    const statement = `delete from acc_status where status_id = ${id}`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router