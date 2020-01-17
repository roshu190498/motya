import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AccountListComponent } from './account/list/account.list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AccountService } from './account/account.service';
import { CustomerRegisterComponent } from './customer/register/customer.register.component';
import { CustomerService } from './customer/customer.service';
import { CustomerLoginComponent } from './customer/login/customer.login.component';
import { RouterModule, Route } from '@angular/router';
import { EmployeeService } from './employee/employee.service';
import { EmployeeRegisterComponent } from './employee/register/employee.registration.component';
import { EmployeeLoginComponent } from './employee/login/employee.login.component';
import { AccStatusService } from './acc_status/acc_status.service';
import { AccStatusListComponent } from './acc_status/list/acc_status.list.component';
import { AccTypeListComponent } from './acc_type/list/acc_type.list.component';
import { AccTypeService } from './acc_type/acc_type.service';
import { LoanTypeListComponent } from './loan_type/list/loan_type.list.component';
import { LoanTypeService } from './loan_type/loan_type.service';
import { AccountAddComponent } from './account/add/account.add.component';
import { CustomerListComponent } from './customer/list/customer.list.component';
import { EmployeeListComponent } from './employee/list/employee.list.component';
import { BankService } from './bankservice/bank.service';
import { BankserviceListComponent } from './bankservice/list/bankservice.list.component';
import { BankserviceAddComponent } from './bankservice/add/bankservice.add.component';
import { LoanStatusService } from './loan_status/loan_status.service';
import { LoanService } from './loan/loan.service';
import { LoanListComponent } from './loan/list/loan.list.component';
import { LoanAddComponent } from './loan/add/loan.add.component';
import { TransTypeService } from './trans_type/trans_type.service';
import { TransactionListComponent } from './transaction/list/transaction.list.component';
import { TransService } from './transaction/transaction.service';
import { TransactionAddComponent } from './transaction/add/transaction.add.component';
import { AccStatementComponent } from './acc_statement/list/acc_statement.list.component';
import { AccStatementService } from './acc_statement/acc_statement.service';
import { AccountUpdateComponent } from './account/update/account.update.component';
import { AdminLoginComponent } from './admin/login/admin.login.component';
import { AdminService } from './admin/admin.service';
import { EmployeeListAdminComponent } from './employee/list_admin/employee.list_admin.component';
import { CustomerDetailsComponent } from './customer/details/customer.details.component';
import { CustomerWithdrawComponent } from './customer/withdraw/customer.withdraw.component';
import { CustomerDepositComponent } from './customer/deposit/customer.deposit.component';
import { CustomerAccountInfoComponent } from './customer/accountInfo/customer.accountInfo.component';
import { CustomerFundTransferComponent } from './customer/fundTransfer/customer.fundTransfer.component';
import { CustomerLoanComponent } from './customer/loans/customer.loan.component';
import { LoanRatesService } from './loan_rates/loan_rates.service';
import { LoanUpdateComponent } from './loan/update/loan.update.component';
import { ApprovedLoanService } from './approvedLoan/approvedLoan.service';
import { ApprovedLoanListComponent } from './approvedLoan/list/approvedLoan.list.component';
import { ApprovedLoanUpdateComponent } from './approvedLoan/update/approvedLoan.update.component';
import { CustomerUpdateComponent } from './customer/update/customer.update.component';

const routes: Route[] = [
  // the default component
  //{ path: 'root', component: AppComponent },

  { path: 'admin-login', component: AdminLoginComponent },

  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'customer-register', component: CustomerRegisterComponent },
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'customer-update', component: CustomerUpdateComponent },
  { path: 'customer-details/:email', component: CustomerDetailsComponent },
  { path: 'customer-withdraw/:email', component: CustomerWithdrawComponent },
  { path: 'customer-deposit/:email', component: CustomerDepositComponent },
  { path: 'customer-fundTransfer/:email', component: CustomerFundTransferComponent },
  { path: 'customer-loan/:email', component: CustomerLoanComponent },
  { path: 'customer-accountInfo/:email/:acc_no', component: CustomerAccountInfoComponent },

  { path: 'employee-register', component: EmployeeRegisterComponent },
  { path: 'employee-login', component: EmployeeLoginComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'employee-list_admin', component: EmployeeListAdminComponent },

  { path: 'account-list', component: AccountListComponent },
  { path: 'account-add', component: AccountAddComponent },
  { path: 'account-update/:acc_no', component: AccountUpdateComponent },

  { path: 'acc_statement-list', component: AccStatementComponent },

  { path: 'loan-list', component: LoanListComponent },
  { path: 'approvedLoan-list', component: ApprovedLoanListComponent },
  { path: 'approvedLoan-update/:acc_no', component: ApprovedLoanUpdateComponent },
  { path: 'loan-add', component: LoanAddComponent },
  { path: 'loan-update/:acc_no', component: LoanUpdateComponent },

  { path: 'transaction-list', component: TransactionListComponent },
  { path: 'transaction-add', component: TransactionAddComponent },
  
  { path: 'bankservice-list', component: BankserviceListComponent },
  { path: 'bankservice-add', component: BankserviceAddComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    
    AccountListComponent,
    AccStatusListComponent,
    AccTypeListComponent,
    AccountAddComponent,
    AccountUpdateComponent,
    AccStatementComponent,

    LoanTypeListComponent,

    AdminLoginComponent,

    CustomerRegisterComponent,
    CustomerLoginComponent,
    CustomerListComponent,
    CustomerUpdateComponent,
    CustomerDetailsComponent,
    CustomerWithdrawComponent,
    CustomerDepositComponent,
    CustomerAccountInfoComponent,
    CustomerFundTransferComponent,
    CustomerLoanComponent,

    EmployeeRegisterComponent,
    EmployeeLoginComponent,
    EmployeeListComponent,
    EmployeeListAdminComponent,

    BankserviceListComponent,
    BankserviceAddComponent,

    LoanListComponent,
    ApprovedLoanListComponent,
    ApprovedLoanUpdateComponent,
    LoanAddComponent,
    LoanUpdateComponent,

    TransactionListComponent,
    TransactionAddComponent,
  ],
  
  imports: [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  RouterModule.forRoot(routes)
  ],
  
  providers: [
    AccountService,
    AccStatusService,
    AccTypeService,
    AccStatementService,
    CustomerService,
    EmployeeService,
    AdminService,
    LoanTypeService,
    BankService,
    LoanStatusService,
    LoanService,
    ApprovedLoanService,
    LoanRatesService,
    TransTypeService,
    TransService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
