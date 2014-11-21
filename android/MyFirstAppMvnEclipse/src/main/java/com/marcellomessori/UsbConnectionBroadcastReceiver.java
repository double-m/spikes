package com.marcellomessori;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.widget.Toast;

public class UsbConnectionBroadcastReceiver extends BroadcastReceiver {

	@Override
	public void onReceive(Context context, Intent intent) {
		
		IntentFilter extraFilterToGetBatteryInfo = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
		Intent extraIntentToGetBatteryInfo = context.registerReceiver(null, extraFilterToGetBatteryInfo);
		
		int chargePlug = extraIntentToGetBatteryInfo.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1);
		boolean usbCharge = chargePlug == BatteryManager.BATTERY_PLUGGED_USB;
		boolean acCharge = chargePlug == BatteryManager.BATTERY_PLUGGED_AC; 

        if (acCharge) {
    		Toast.makeText(context, R.string.connected_ac_message, Toast.LENGTH_LONG).show();
        } else if (usbCharge) {
    		Toast.makeText(context, R.string.connected_usb_message, Toast.LENGTH_LONG).show();
        }
	}
}