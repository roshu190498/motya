const db = require('./db')
const utils = require('./utils')
const express = require('express')
const cryptoJs = require('crypto-js')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from user`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/',(request,response)=>{
    const {user_name,user_email,user_password}=request.body
    const encryptedPassword = '' + cryptoJs.MD5(user_password)
    
    const connection= db.connect()
    const statement=`insert into user (user_name,user_email,user_password) values('${user_name}','${user_email}','${encryptedPassword}')`
    
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.post('/register',(request,response)=>{
    const {user_name,user_email,user_password}=request.body
    const encryptedPassword = '' + cryptoJs.MD5(user_password)
    
    const connection= db.connect()
    const statement=`insert into user (user_name,user_email,user_password) values('${user_name}','${user_email}','${encryptedPassword}')`
    
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.post('/login', (request, response) => {
    const {email, password} = request.body
    const encryptedPassword = '' + cryptoJs.MD5(password)
    const connection = db.connect()
    const statement = `select * from user where user_email = '${email}' and user_password = '${encryptedPassword}'`
    connection.query(statement, (error, users) => {
        connection.end()
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                username: user['username'],
                email: user['email']
            }
            response.send(utils.createResult(null, info))
        }
    })
})

router.post('/adminLogin', (request, response) => {
    const {email, password} = request.body
    const connection = db.connect()
    const statement = `select * from admin where email = '${email}' and password = '${password}'`
    connection.query(statement, (error, users) => {
        connection.end()
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                adminname: user['name'],
                email: user['email']
            }
            response.send(utils.createResult(null, info))
        }
    })
})

router.delete('/:id',(request,response)=>{
    const {id}=request.params
    
    const connection=db.connect()
    const statement=`delete from user where user_id=${id}`
    
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.put('/:id',(request,response)=>{
    const {id}=request.params
    const {user_password} =request.body
    const encryptedPassword = '' + cryptoJs.MD5(user_password)
    
    const connection=db.connect()
    const statement=`update user set user_password='${encryptedPassword}' where user_id=${id}`
    
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})


module.exports = router