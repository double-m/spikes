package com.marcellomessori;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.widget.TextView;

public class DisplayMessageActivity extends ActionBarActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		Log.v("DisplayMessageActivity", "before onCreate");
		super.onCreate(savedInstanceState);
		Log.v("DisplayMessageActivity", "you don't see me - it brakes here");
		
	    // Get the message from the intent
	    Intent intent = getIntent();
	    String message = intent.getStringExtra(HelloAndroidActivity.EXTRA_MESSAGE);

	    // Create the text view
	    TextView textView = new TextView(this);
	    textView.setTextSize(40);
	    textView.setText(message);

	    // Set the text view as the activity layout
	    setContentView(textView);
	}

}
