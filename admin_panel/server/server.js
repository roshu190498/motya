const express = require(`express`)
const bodyParser = require(`body-parser`)
const routerAccount = require(`./account`)
const routerAcc_status = require(`./acc_status`)
const routerAcc_type = require(`./acc_type`)
const routerAcc_holder = require(`./acc_holder`)
const routerAcc_statement = require(`./acc_statement`)
const routerBankservice = require(`./bankservice`)
const routerTrans_type = require(`./trans_type`)
const routerTransaction = require(`./transaction`)
const routerUser = require(`./user`)
const routerLoan = require(`./loan`)
const routerApprovedLoan = require(`./approvedLoan`)
const routerLoan_type = require(`./loan_type`)
const routerLoan_status = require(`./loan_status`)
const routerLoan_rates = require(`./loan_rates`)

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json())
app.use(`/account`, routerAccount)
app.use(`/acc_status`, routerAcc_status)
app.use(`/acc_type`, routerAcc_type)
app.use(`/acc_holder`, routerAcc_holder)
app.use(`/acc_statement`, routerAcc_statement)
app.use(`/bankservice`, routerBankservice)
app.use(`/trans_type`, routerTrans_type)
app.use(`/transaction`, routerTransaction)
app.use('/user', routerUser)
app.use('/loan', routerLoan)
app.use('/approvedLoan', routerApprovedLoan)
app.use('/loan_type', routerLoan_type)
app.use('/loan_status', routerLoan_status)
app.use('/loan_rates', routerLoan_rates)


app.listen(4000,`0.0.0.0`,() => {
    console.log(`Server does started on port no 4000...!`)
})