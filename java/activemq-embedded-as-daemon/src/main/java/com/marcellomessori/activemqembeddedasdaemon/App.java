package com.marcellomessori.mavenactivemqembedded;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.activemq.broker.BrokerService;

class App {

	public static void main(String[] args) throws Exception {
		
		Runnable runnableBrokerService = new Runnable() {
			@Override
			public void run() {
				try {
					System.out.println("Starting BrokerService daemon...");

					BrokerService brokerService = new BrokerService();
					brokerService.addConnector("tcp://localhost:61616");
					brokerService.start();
				} catch (Exception ex) {
					Logger.getLogger(App.class.getName()).log(Level.SEVERE, null, ex);
				}
			}
		};
		
		Thread someThread = new Thread(runnableBrokerService, "BrokerService Daemon");
		someThread.setDaemon(true);
		someThread.start();
		
		while(true){}
	}
}
