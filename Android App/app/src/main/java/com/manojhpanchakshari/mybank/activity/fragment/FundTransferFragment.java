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

public class FundTransferFragment extends Fragment {
    View view;

    private OnFragmentInteractionListener mListener;
    EditText editAccHoldName, editBAccNo, editCBAccNo, editAmount;
    Button btnTransfer, btncancel;
    float acc_bal;
    int acc_no;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_fundtransfer, container, false);

        editAccHoldName = view.findViewById(R.id.editBenAccHoldName);
        editBAccNo = view.findViewById(R.id.editBenAccNo);
        editCBAccNo = view.findViewById(R.id.editCBenAccNo);
        editAmount = view.findViewById(R.id.editAmount);
        btnTransfer = view.findViewById(R.id.btnFundTransfer);
        btncancel = view.findViewById(R.id.btnCancel);

        btnTransfer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SharedPreferences prefs = getActivity().getSharedPreferences("AccountDetails", MODE_PRIVATE);
                acc_bal = prefs.getFloat("acc_bal", 0);
                acc_no = prefs.getInt("acc_no", 0);

                final String url = Utils.getUrl(Constats.PATH_CUSTOMER + "/withdraw/" +acc_no);
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
                                    final String url1 = Utils.getUrl(Constats.PATH_ACCOUNT + "/withdrawBal/" + acc_no);
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
                                                        final String url2 = Utils.getUrl(Constats.PATH_TRANSACTION );
                                                        Log.e("url2" , url2);
                                                        final JsonObject body2 = new JsonObject();

                                                        body2.addProperty("acc_no", acc_no);
                                                        body2.addProperty("trans_type", 3);
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
                                                                            final String url3 = Utils.getUrl(Constats.PATH_CUSTOMER + "/fundtransfer/" + acc_no);
                                                                            Log.d("url", "url" + url);
                                                                            final JsonObject body3 = new JsonObject();

                                                                            body3.addProperty("benAccNo", editCBAccNo.getText().toString());
                                                                            body3.addProperty("amount", editAmount.getText().toString());
                                                                            Log.d("body", "body" + body);

                                                                            Ion.with(getActivity())
                                                                                    .load("PUT", url3)
                                                                                    .setJsonObjectBody(body3)
                                                                                    .asJsonObject()
                                                                                    .setCallback(new FutureCallback<JsonObject>() {
                                                                                        @Override
                                                                                        public void onCompleted(Exception e, JsonObject result) {
                                                                                            Log.d("URL", url);
                                                                                            String status = result.get("status").getAsString();

                                                                                            Log.d("Result", status);
                                                                                            if (status.equals("success")) {
                                                                                                final String url4 = Utils.getUrl(Constats.PATH_ACCOUNT + "/fundTransferBal/" + acc_no);
                                                                                                Log.d("url", "url" + url);
                                                                                                final JsonObject body4 = new JsonObject();

                                                                                                body4.addProperty("benificiaryAccNo", editCBAccNo.getText().toString());
                                                                                                body4.addProperty("benificiaryAccHolderName", editAccHoldName.getText().toString());
                                                                                                body4.addProperty("amount", editAmount.getText().toString());
                                                                                                Log.d("body", "body" + body);

                                                                                                Ion.with(getActivity())
                                                                                                        .load("PUT", url4)
                                                                                                        .setJsonObjectBody(body4)
                                                                                                        .asJsonObject()
                                                                                                        .setCallback(new FutureCallback<JsonObject>() {
                                                                                                            @Override
                                                                                                            public void onCompleted(Exception e, JsonObject result) {
                                                                                                                Log.d("URL", url);
                                                                                                                String status = result.get("status").getAsString();

                                                                                                                Log.d("Result", status);
                                                                                                                if (status.equals("success")) {
                                                                                                                    final String url5 = Utils.getUrl(Constats.PATH_TRANSACTION );
                                                                                                                    Log.e("url2" , url5);
                                                                                                                    final JsonObject body5 = new JsonObject();

                                                                                                                    body5.addProperty("acc_no", editCBAccNo.getText().toString());
                                                                                                                    body5.addProperty("trans_type", 1);
                                                                                                                    body5.addProperty("trans_amount", editAmount.getText().toString());
                                                                                                                    Log.d("body", "body" + body);

                                                                                                                    Ion.with(getActivity())
                                                                                                                            .load("POST", url5)
                                                                                                                            .setJsonObjectBody(body5)
                                                                                                                            .asJsonObject()
                                                                                                                            .setCallback(new FutureCallback<JsonObject>() {
                                                                                                                                @Override
                                                                                                                                public void onCompleted(Exception e, JsonObject result) {
                                                                                                                                    String status = result.get("status").getAsString();

                                                                                                                                    Log.d("Result", status);
                                                                                                                                    if (status.equals("success")) {
                                                                                                                                        Toast.makeText(getActivity(), "Fund transferred successful..!", Toast.LENGTH_SHORT).show();
                                                                                                                                    } else {
                                                                                                                                        Toast.makeText(getActivity(), "Error", Toast.LENGTH_SHORT).show();
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            });
                                                                                                                } else {
                                                                                                                    Toast.makeText(getActivity(), "Error", Toast.LENGTH_SHORT).show();
                                                                                                                }
                                                                                                            }
                                                                                                        });
                                                                                            } else {
                                                                                                Toast.makeText(getActivity(), "Error", Toast.LENGTH_SHORT).show();
                                                                                            }
                                                                                        }
                                                                                    });
                                                                        } else {
                                                                            Toast.makeText(getActivity(), "Error", Toast.LENGTH_SHORT).show();
                                                                        }
                                                                    }
                                                                });

                                                    } else {
                                                        Toast.makeText(getActivity(), "Error", Toast.LENGTH_SHORT).show();
                                                    }
                                                }
                                            });
                                } else {
                                    Toast.makeText(getActivity(), "Error", Toast.LENGTH_SHORT).show();
                                }
                            }
                        });











            }
        });

        btncancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                FragmentTransaction ft = getFragmentManager().beginTransaction();
//                ft.replace(R.id.framelayout, new DetailsFragment(), "DetailsFragment");
//                ft.addToBackStack(null);
//                ft.commit();
            }
        });

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
