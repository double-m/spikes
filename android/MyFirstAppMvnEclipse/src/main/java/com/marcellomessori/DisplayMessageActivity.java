package com.marcellomessori;

import com.marcellomessori.myfirstlibmvn.helpers.MyMath;
import android.content.Intent;
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

	    textView.setText(message + " " + myMath.sum(100, 1));

	    // Set the text view as the activity layout
	    setContentView(textView);
	}

}
