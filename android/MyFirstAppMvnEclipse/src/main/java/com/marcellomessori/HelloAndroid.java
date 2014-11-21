package com.marcellomessori;

import android.app.Application;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.widget.Toast;

public class HelloAndroid extends Application {
	
    @Override
    public void onCreate() {
        super.onCreate();

		notifyAppStarted();
	}

	private void notifyAppStarted() {
		Intent resultIntent = new Intent(this, HelloAndroidActivity.class);
		PendingIntent resultPendingIntent =
		    PendingIntent.getActivity(
		    this,
		    0,
		    resultIntent,
		    PendingIntent.FLAG_UPDATE_CURRENT
		);
		
	    int stringId = this.getApplicationInfo().labelRes;
	    String applicationLabel = this.getString(stringId);
	    
		Notification.Builder notificationBuilder =
			    new Notification.Builder(this)
			    .setContentTitle(applicationLabel)
			    .setContentText(applicationLabel + " launched!")
			    .setSmallIcon(R.drawable.ic_launcher)
			    .setAutoCancel(true)
			    .setContentIntent(resultPendingIntent);
		
		NotificationManager notificationManager = 
				  (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

		notificationManager.notify(0, notificationBuilder.build());
		
        Toast.makeText(this, "Started", Toast.LENGTH_LONG).show();
	}

}
