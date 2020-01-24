package com.manojhpanchakshari.mybank.activity.fragment;

import android.app.FragmentTransaction;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;
import com.manojhpanchakshari.mybank.R;
import com.manojhpanchakshari.mybank.utils.Constats;
import com.manojhpanchakshari.mybank.utils.Utils;

import static android.content.Context.MODE_PRIVATE;

public class DepositFragment extends Fragment {
    View view;

    private OnFragmentInteractionListener mListener;
    EditText editAccNo, editAmount;
    Button btndeposit, btncancel;
    int acc_no;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_deposit, container, false);
        SharedPreferences prefs = getActivity().getSharedPreferences("AccountDetails", MODE_PRIVATE);
        final float acc_bal = prefs.getFloat("acc_bal", 0);
        acc_no = prefs.getInt("acc_no", 0);
        editAccNo = view.findViewById(R.id.editAccNo);
        editAmount = view.findViewById(R.id.editAmount);
        btndeposit = view.findViewById(R.id.btnDeposit);
        btncancel = view.findViewById(R.id.btnCancel);
        editAccNo.setText(""+acc_no);
        btndeposit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                Log.e("acc_no",""+acc_no);
                Log.e("acc_no",""+acc_no);

                final String url = Utils.getUrl(Constats.PATH_CUSTOMER + "/deposit/" + editAccNo.getText().toString());
                Log.d("url", "url" + url);
                final JsonObject body = new JsonObject();

                body.addProperty("acc_bal", acc_bal);
                body.addProperty("amount", editAmount.getText().toString());
                Log.d("body", "body" + body);

                Ion.with(getActivity())
                        .load("PUT", url)
                        .setJsonObjectBody(body)
                        .asJsonObject()
                        .setCallback(new FutureCallback<JsonObject>() {
                            @Override
                            public void onCompleted(Exception e, JsonObject result) {
                                Log.d("URL", url);
                                String status = result.get("status").getAsString();

                                Log.d("Result", status);
                                if (status.equals("success")) {

                                } else {
                                    Toast.makeText(getActivity(), "Error", Toast.LENGTH_SHORT).show();
                                }
                            }
                        });


                final String url1 = Utils.getUrl(Constats.PATH_ACCOUNT + "/depositBal/" + editAccNo.getText().toString());
                final JsonObject body1 = new JsonObject();

                body1.addProperty("acc_bal", acc_bal);
                body1.addProperty("amount", editAmount.getText().toString());
                Log.d("body", "body" + body);

                Ion.with(getActivity())
                        .load("PUT", url1)
                        .setJsonObjectBody(body)
                        .asJsonObject()
                        .setCallback(new FutureCallback<JsonObject>() {
                            @Override
                            public void onCompleted(Exception e, JsonObject result) {
                                String status = result.get("status").getAsString();

                                Log.d("Result", status);
                                if (status.equals("success")) {
//                                    Toast.makeText(getActivity(), "Withdraw successful", Toast.LENGTH_SHORT).show();
                                } else {
                                    Toast.makeText(getActivity(), "Error", Toast.LENGTH_SHORT).show();
                                }
                            }
                        });

                final String url2 = Utils.getUrl(Constats.PATH_TRANSACTION );
                Log.e("url2" , url2);
                final JsonObject body2 = new JsonObject();

                body2.addProperty("acc_no", editAccNo.getText().toString());
                body2.addProperty("trans_type", 1);
                body2.addProperty("trans_amount", editAmount.getText().toString());
                Log.d("body", "body" + body);

                Ion.with(getActivity())
                        .load("POST", url2)
                        .setJsonObjectBody(body2)
                        .asJsonObject()
                        .setCallback(new FutureCallback<JsonObject>() {
                            @Override
                            public void onCompleted(Exception e, JsonObject result) {
                                String status = result.get("status").getAsString();

                                Log.d("Result", status);
                                if (status.equals("success")) {
                                    Toast.makeText(getActivity(), "Deposited successful", Toast.LENGTH_SHORT).show();
                                } else {
                                    Toast.makeText(getActivity(), "Error", Toast.LENGTH_SHORT).show();
                                }
                            }
                        });
            }
        });

//        btncancel.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                FragmentTransaction ft = getFragmentManager().beginTransaction();
//                ft.replace(R.id.framelayout, new DetailsFragment(), "DetailsFragment");
//                ft.addToBackStack(null);
//                ft.commit();
//            }
//        });
        return view;
    }

    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
}
