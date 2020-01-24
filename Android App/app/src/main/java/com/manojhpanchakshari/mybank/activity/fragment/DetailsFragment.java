package com.manojhpanchakshari.mybank.activity.fragment;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;
import com.manojhpanchakshari.mybank.R;
import com.manojhpanchakshari.mybank.utils.Constats;
import com.manojhpanchakshari.mybank.utils.Utils;

import static android.content.Context.MODE_PRIVATE;

public class DetailsFragment extends Fragment {
    View view;
    TextView tvAccNo, tvName, tvAddress, tvPhone, tvEmail, tvAccountBal, tvAccountOpenDate;
    private OnFragmentInteractionListener mListener;
    @Override

    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_details, container, false);
        tvAccNo = view.findViewById(R.id.tvAccNo);
        tvName = view.findViewById(R.id.tvName);
        tvAddress = view.findViewById(R.id.tvAddress);
        tvPhone = view.findViewById(R.id.tvPhone);
        tvEmail = view.findViewById(R.id.tvEmail);
        tvAccountBal = view.findViewById(R.id.tvAccountBal);
//        tvAccountOpenDate = view.findViewById(R.id.tvOpenDate);
        loadfromApi();
        return view;
    }

    public void loadfromApi() {
        SharedPreferences prefs = getActivity().getSharedPreferences("UserDetails", MODE_PRIVATE);
        int acc_no = prefs.getInt("acc_no", 0);

        final String url = Utils.getUrl(Constats.PATH_CUSTOMER + "/details/" + acc_no);

        Ion.with(this)
                .load("GET", url)
                .asJsonObject()
                .setCallback(new FutureCallback<JsonObject>() {
                    @Override
                    public void onCompleted(Exception e, JsonObject result) {
                        Log.d("URL", url);
                        String status = result.get("status").getAsString();
                        Log.d("Result", status);
                        if (status.equals("success")) {
                            JsonArray customer = result.get("data").getAsJsonArray();
                            JsonObject obj = customer.get(0).getAsJsonObject();
                            tvName.setText(obj.get("name").getAsString());
                            tvAddress.setText(obj.get("address").getAsString());
                            tvPhone.setText(obj.get("mob_no").getAsString());
                            tvEmail.setText(obj.get("email").getAsString());
                            tvAccountBal.setText(obj.get("acc_bal").getAsString());
                            String date = obj.get("open_date").getAsString();
                            String[] d = date.split("T",10);
//                            tvAccountOpenDate.setText(obj.get("open_date").getAsString());
                            tvAccNo.setText(obj.get("acc_no").getAsString());

                            SharedPreferences.Editor editor = getActivity().getSharedPreferences("AccountDetails", MODE_PRIVATE).edit();
                            editor.putFloat("acc_bal",obj.get("acc_bal").getAsFloat());
                            editor.putInt("acc_no",obj.get("acc_no").getAsInt());
                            editor.apply();

                        } else {
                            String error = result.get("error").getAsString();
                        }
                    }
                });
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

