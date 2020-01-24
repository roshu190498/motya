package com.manojhpanchakshari.mybank.activity.customer;

import android.content.Intent;
import android.content.SharedPreferences;
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

import org.json.JSONObject;


public class LoginActivity extends BaseActivity {

    EditText editEmail, editPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        editEmail = findViewById(R.id.editEmail);
        editPassword = findViewById(R.id.editPassword);

    }

    public void onRegister(View v) {
        Intent intent = new Intent(LoginActivity.this, RegistrationActivity.class);
        startActivity(intent);
    }

    public void onLogin(View v) {

        String email = editEmail.getText().toString();
        String password = editPassword.getText().toString();
        if (email.length() == 0) {
            editEmail.setError("Email is mandatory");
        } else if (password.length() == 0) {
            editPassword.setError("Password is mandatory");
        } else {
            final String url = Utils.getUrl(Constats.PATH_CUSTOMER + "/login");
            Log.d("url", "url" + url);
            final JsonObject body = new JsonObject();

            body.addProperty("email", email);
            body.addProperty("password", password);
            Log.d("body", "body" + body);

            Ion.with(this)
                    .load("POST", url)
                    .setJsonObjectBody(body)
                    .asJsonObject()
                    .setCallback(new FutureCallback<JsonObject>() {
                        @Override
                        public void onCompleted(Exception e, JsonObject result) {
                            Log.d("URL", url);
                            String status = result.get("status").getAsString();

                            Log.d("Result", status);
                            if (status.equals("success")) {
                                Toast.makeText(LoginActivity.this, "Authenticated...!", Toast.LENGTH_SHORT).show();
                                Intent intent = new Intent(LoginActivity.this, DetailsActivity.class);
                                startActivity(intent);
                                JsonObject customer=result.get("data").getAsJsonObject();
                                SharedPreferences.Editor editor = getSharedPreferences("UserDetails", MODE_PRIVATE).edit();
                                editor.putInt("acc_no", customer.get("acc_no").getAsInt());
                                editor.apply();
                                finish();
                            } else {
                                String error = result.get("error").getAsString();
                                Toast.makeText(LoginActivity.this, "Invalid User", Toast.LENGTH_SHORT).show();
                            }
                        }
                    });


        }

    }
}
