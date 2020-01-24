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
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;
import com.manojhpanchakshari.mybank.R;
import com.manojhpanchakshari.mybank.utils.Constats;
import com.manojhpanchakshari.mybank.utils.Utils;

import static android.content.Context.MODE_PRIVATE;


/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link ApplyLoanFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link ApplyLoanFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ApplyLoanFragment extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    View view;
    EditText loanAmount;
    Spinner spinner;
    String loanTypes[] = {"Personal", "Educational", "Home"};
    TextView onApplyLoan, onCancel;

    private OnFragmentInteractionListener mListener;

    public ApplyLoanFragment() {
        // Required empty public constructor
    }

    public static ApplyLoanFragment newInstance(String param1, String param2) {
        ApplyLoanFragment fragment = new ApplyLoanFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_apply_loan, container, false);

        loanAmount = view.findViewById(R.id.editLoanAmount);
        spinner = view.findViewById(R.id.spinnerType);

        ArrayAdapter<String> stringArrayAdapter = new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1, loanTypes);
        stringArrayAdapter.setDropDownViewResource(android.R.layout.simple_list_item_1);
        spinner.setAdapter(stringArrayAdapter);

        onApplyLoan = view.findViewById(R.id.onApplyLoan);
        onCancel = view.findViewById(R.id.onCancel);

        onApplyLoan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SharedPreferences prefs = getActivity().getSharedPreferences("AccountDetails", MODE_PRIVATE);
                int acc_no = prefs.getInt("acc_no", 0);
                int loanType = 0;
                if ((spinner.getSelectedItem().toString()).equals("Personal"))
                {
                    loanType = 2;
                } else if ((spinner.getSelectedItem().toString()).equals("Home"))
                {
                    loanType = 3;
                } else if ((spinner.getSelectedItem().toString()).equals("Educational"))
                {
                    loanType = 4;
                }

                final String url = Utils.getUrl(Constats.PATH_LOAN );
                Log.d("url", "url" + url);
                final JsonObject body = new JsonObject();

                body.addProperty("acc_no", acc_no);
                body.addProperty("loan_amount", loanAmount.getText().toString());
                body.addProperty("type_id", loanType);
                body.addProperty("status_id", 1);
                Log.d("body", "body" + body);

                Ion.with(getActivity())
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
                                    Toast.makeText(getActivity(), "Applied loan succesfully..!", Toast.LENGTH_SHORT).show();
                                } else {
                                    Toast.makeText(getActivity(), "Error", Toast.LENGTH_SHORT).show();
                                }
                            }
                        });
            }
        });


        onCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
        return view;
    }

    // TODO: Rename method, update argument and hook method into UI event
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
