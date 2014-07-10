package com.marcellomessori;

import com.marcellomessori.myfirstlibmvn.helpers.MyMath;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.app.Activity;
import android.widget.TextView;

public class DisplayMessageActivity extends Activity {

	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);

	    // Get the message from the intent
	    Intent intent = getIntent();
	    String message = intent.getStringExtra(HelloAndroidActivity.EXTRA_MESSAGE);

	    // Import a library, just to try :)
	    MyMath myMath = new MyMath();

	    // Create the text view
	    TextView textView = new TextView(this);
	    textView.setTextSize(40);

	    textView.setText(message + System.getProperty ("line.separator")
	    		+ "100 + 1 = " + myMath.sum(100, 1) + System.getProperty ("line.separator")
	    		+ "Build SDK version: " + Build.VERSION.SDK_INT
	    		);

	    // Set the text view as the activity layout
	    setContentView(textView);
	}

}
