const express = require(`express`)
const db = require(`./db`)
const utils = require(`./utils`)

const router = express.Router()

router.get(`/`,(request, response) => {
    const connection = db.connect()
    const statement = `select * from acc_holder`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.get('/:email',(request,response)=>{
    const {email}=request.params
    const connection=db.connect()
    const statement=`select * from acc_holder where email='${email}'`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.get('/details/:acc_no',(request,response)=>{
    const {acc_no}=request.params
    console.log(acc_no)
    const connection=db.connect()
    const statement=`select * from acc_holder where acc_no=${acc_no}`
    console.log(statement)
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.post(`/`, (request, response) => {
    const {name, address, mob_no, email, password, open_bal, } = request.body
    
    const connection = db.connect()
    const statement = `insert into acc_holder (name, address, mob_no, email, password, open_bal) values('${name}', '${address}', ${mob_no},'${email}', '${password}', ${open_bal})`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
} )

router.post('/login', (request, response) => {
    const {email, password} = request.body
    const connection = db.connect()
    const statement = `select * from acc_holder where email = '${email}' and password = '${password}'`
    connection.query(statement, (error, customers) => {
        connection.end()
        
        if (customers.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const customer = customers[0]
            const info = {
                customername: customer['name'],
                email: customer['email'],
                activate_status : customer['activate_status']
            }
            response.send(utils.createResult(null, info))
        }
    })
})

router.post(`/register`, (request, response) => {
    const {name, address, mob_no, email, password, open_bal} = request.body
    
    const connection = db.connect()
    const statement = `insert into acc_holder (name, address, mob_no, email, password, acc_bal, open_date) values('${name}', '${address}', ${mob_no},'${email}', '${password}', ${open_bal}, CURRENT_DATE())`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
} )

router.put('/:acc_no', (request, response) => {
    const {acc_no} = request.params
    const {name,address,mob_no,email,activate_status} = request.body

    const statement = `update acc_holder set name = '${name}', address = '${address}', mob_no = '${mob_no}', email = '${email}', activate_status = '${activate_status}' where acc_no = ${acc_no}`
    const connection = db.connect()
    console.log("statment=="+statement)
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/toggle/:acc_no', (request, response) => {
    const {acc_no} = request.params
    const {toggle_status} = request.body
    

    const statement = `update acc_holder set activate_status = '${toggle_status}' where acc_no = ${acc_no}`
    console.log(statement)
    const connection = db.connect()
    console.log("statment=="+statement)
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/withdraw/:acc_no', (request, response) => {
    const {acc_no} = request.params
    const{acc_bal, amount} = request.body

    const statement = `update acc_holder set acc_bal = ${acc_bal} - ${amount} where acc_no = ${acc_no}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/deposit/:acc_no', (request, response) => {
    const {acc_no} = request.params
    const{acc_bal, amount} = request.body

    const statement = `update acc_holder set acc_bal = ${acc_bal} + ${amount} where acc_no = ${acc_no}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/fundTransfer/:acc_no', (request, response) => {
    const {benAccNo, amount} = request.body
    const acc_no = request.params
    const connection = db.connect()
    var benAccBal 
    const statement=`select * from acc_holder where acc_no='${benAccNo}'`
    connection.query(statement,(error,data)=>{
        console.log("....." + data);
        benAccBal = data[0].acc_bal
       
        const statement1 = `update acc_holder set acc_bal = ${benAccBal} + ${amount} where acc_no = ${benAccNo} `
        connection.query(statement1, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        })
    })
})

router.delete('/:acc_no', (request, response) => {
    const {acc_no} = request.params

    const connection = db.connect()
    const statement = `delete from acc_holder where acc_no = ${acc_no}`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router