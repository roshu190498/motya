package com.manojhpanchakshari.mybank.activity.customer;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;
import com.manojhpanchakshari.mybank.R;
import com.manojhpanchakshari.mybank.activity.BaseActivity;
import com.manojhpanchakshari.mybank.utils.Constats;
import com.manojhpanchakshari.mybank.utils.Utils;

public class RegistrationActivity extends BaseActivity {

    EditText editName, editAddress, editMobNo, editEmail, editPassword, editAccBal;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registartion);
        editName = findViewById(R.id.editName);
        editAddress = findViewById(R.id.editAddress);
        editMobNo = findViewById(R.id.editMob_No);
        editEmail = findViewById(R.id.editEmail);
        editPassword = findViewById(R.id.editPassword);
        editAccBal = findViewById(R.id.editAccBal);



    }
    public void onRegister(View v)
    {
        Log.d("hello","hi");
        String name = editName.getText().toString();
        String email = editEmail.getText().toString();
        String password = editPassword.getText().toString();
        long mob_no = Long.parseLong(editMobNo.getText().toString());
        String address = editAddress.getText().toString();
        double balalnce = Double.parseDouble(editAccBal.getText().toString());

        if (name.length() == 0) {
            editName.setError("Name is mandatory");
        } else if (email.length() == 0) {
            editEmail.setError("Email is mandatory");
        } else if (password.length() == 0) {
            editPassword.setError("Password is mandatory");
        } else if (mob_no == 0) {
            editMobNo.setError("Mobile Number is mandatory");
        } else  if (address.length() == 0) {
            editAddress.setError("Address is mandatory");
        } else  if (balalnce == 0) {
            editAddress.setError("Balance is mandatory");
        } else {
            final String url = Utils.getUrl(Constats.PATH_CUSTOMER + "/register");
                  Log.d("url", "url" + url);
            final JsonObject body = new JsonObject();

            body.addProperty("name",name);
            body.addProperty("address",address);
            body.addProperty("mob_no",mob_no);
            body.addProperty("email",email);
            body.addProperty("password",password);
            body.addProperty("open_bal",balalnce);

            Log.d("body", "body" +body);

            Ion.with(this)
                    .load("POST", url)
                    .setJsonObjectBody(body)
                    .asJsonObject()
                    .setCallback(new FutureCallback<JsonObject>() {
                        @Override
                        public void onCompleted(Exception e, JsonObject result) {
                            Log.d("URL", url);

//                            String status = result.get("status").getAsString();

                            String status = result.get("status").getAsString();
                            Log.d("Result", status);
                            if (status.equals("success")) {
                                finish();
                            } else {
                                String error = result.get("error").getAsString();
                                Toast.makeText(RegistrationActivity.this, error, Toast.LENGTH_SHORT).show();
                            }
                        }
                    });

        }
    }
    public void onCancel(View v)
    {
        finish();
    }
}
