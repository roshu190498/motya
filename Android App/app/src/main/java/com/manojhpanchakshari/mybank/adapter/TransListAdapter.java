package com.manojhpanchakshari.mybank.adapter;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import com.manojhpanchakshari.mybank.R;
import com.manojhpanchakshari.mybank.model.Transaction;


import java.util.ArrayList;

public class TransListAdapter extends RecyclerView.Adapter<TransListAdapter.ViewHolder> {

    public final Context context;
    public final ArrayList<Transaction> transactions;

    public TransListAdapter(Context context, ArrayList<Transaction> transactions) {
        this.context = context;
        this.transactions = transactions;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {

        LayoutInflater inflater = LayoutInflater.from(context);

        return new ViewHolder(inflater.inflate(R.layout.trans_list_items, null));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
        Log.e("inside adapter", "inside adapter");
        Transaction transaction = transactions.get(i);

        viewHolder.TV_transDate.setText(transaction.getTrans_date().toString());
        viewHolder.TV_trans_amount.setText(String.valueOf(transaction.getTrans_amount()));
        viewHolder.TV_trans_type.setText(transaction.getTrans_type().toString());
    }

    @Override
    public int getItemCount() {
        return transactions.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView TV_transDate, TV_trans_amount, TV_trans_type;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            TV_transDate = itemView.findViewById(R.id.TV_transDate);
            TV_trans_amount = itemView.findViewById(R.id.TV_trans_amount);
            TV_trans_type = itemView.findViewById(R.id.TV_trans_type);
        }
    }
}
