package com.manojhpanchakshari.mybank.activity.fragment;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;
import com.manojhpanchakshari.mybank.R;
import com.manojhpanchakshari.mybank.adapter.TransListAdapter;
import com.manojhpanchakshari.mybank.model.Transaction;
import com.manojhpanchakshari.mybank.utils.Constats;
import com.manojhpanchakshari.mybank.utils.Utils;

import java.util.ArrayList;

import static android.content.Context.MODE_PRIVATE;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link TransactionListFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link TransactionListFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class TransactionListFragment extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    RecyclerView RV_transList;
    ArrayList<Transaction> transArrayList=new ArrayList<>();
    TransListAdapter adapter;

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private OnFragmentInteractionListener mListener;

    public TransactionListFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment TransactionListFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static TransactionListFragment newInstance(String param1, String param2) {
        TransactionListFragment fragment = new TransactionListFragment();
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
        return inflater.inflate(R.layout.fragment_transaction_list, container, false);
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


    private void loadDoctors() {
        SharedPreferences prefs = getActivity().getSharedPreferences("AccountDetails", MODE_PRIVATE);
        int acc_no = prefs.getInt("acc_no", 0);

        final String url= Utils.getUrl(Constats.PATH_TRANSACTION + acc_no);

        Ion.with(this)
                .load(url)
                .asJsonObject()
                .setCallback(new FutureCallback<JsonObject>() {
                    @Override
                    public void onCompleted(Exception e, JsonObject result) {

                        String status=result.get("status").getAsString();

                        if(status.equals("success"))
                        {
                            JsonArray transarray=result.get("data").getAsJsonArray();
                            for (int i=0;i<transarray.size();i++)
                            {
                                JsonObject obj=transarray.get(i).getAsJsonObject();

                                Transaction transaction=new Transaction();
                                transaction.setTrans_id(obj.get("trans_id").getAsInt());
                                transaction.setAcc_no(obj.get("acc_no").getAsInt());
                                transaction.setTrans_type(obj.get("trans_type").getAsString());
                                transaction.setTrans_amount(obj.get("trans_amount").getAsFloat());
                                transaction.setTrans_date(obj.get("trans_Date").getAsString());

                                transArrayList.add(transaction);
                            }
                            adapter.notifyDataSetChanged();
                        }
                    }
                });
    }


    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
}
