package com.manojhpanchakshari.mybank.model;

public class Transaction {

    int trans_id;
    int acc_no;
    String trans_type;
    float trans_amount;
    String trans_date;

    public Transaction() {
    }

    public Transaction(int trans_id, int acc_no, String trans_type, float trans_amount, String trans_date) {
        this.trans_id = trans_id;
        this.acc_no = acc_no;
        this.trans_type = trans_type;
        this.trans_amount = trans_amount;
        this.trans_date = trans_date;
    }

    public int getTrans_id() {
        return trans_id;
    }

    public void setTrans_id(int trans_id) {
        this.trans_id = trans_id;
    }

    public int getAcc_no() {
        return acc_no;
    }

    public void setAcc_no(int acc_no) {
        this.acc_no = acc_no;
    }

    public String getTrans_type() {
        return trans_type;
    }

    public void setTrans_type(String trans_type) {
        this.trans_type = trans_type;
    }

    public float getTrans_amount() {
        return trans_amount;
    }

    public void setTrans_amount(float trans_amount) {
        this.trans_amount = trans_amount;
    }

    public String getTrans_date() {
        return trans_date;
    }

    public void setTrans_date(String trans_date) {
        this.trans_date = trans_date;
    }
}
