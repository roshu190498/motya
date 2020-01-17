const express = require(`express`)
const db = require(`./db`)
const utils = require(`./utils`)

const router = express.Router()

router.get(`/`,(request, response) => {
    const connection = db.connect()
    const statement = `select * from bankservice`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post(`/`, (request, response) => {
    const {service} = request.body
    
    const connection = db.connect()
    const statement = `insert into bankservice (service) value ('${service}')`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
} )

router.put('/:id', (request, response) => {
    const {id} = request.params
    const {service} = request.body

    const statement = `update bankservice set service = '${service}' where service_id = ${id}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:id', (request, response) => {
    const {id} = request.params

    const connection = db.connect()
    const statement = `delete from bankservice where service_id = ${id}`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router