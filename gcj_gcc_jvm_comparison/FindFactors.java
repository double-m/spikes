import java.util.ArrayList;
import java.util.Arrays;

public class FindFactors {
	private static Integer number = -1;
	
	public static void main(String[] args) {
		String usage = "Usage: java FindFactors <INTEGER>";
		
		if(!checkArgs(args)) {
			System.out.println(usage);
			System.exit(1);
		}
		
		System.out.println(Arrays.toString(findFactors()));
	}
	
	private static boolean checkArgs(String[] args) {
		if (args.length == 0) {
			return false;
		}
		
		String inputNumber = args[0];
		try {
			number = Integer.parseInt(inputNumber);
			return true;
		}
		catch(NumberFormatException e) {
			return false;
		}
	}
	
	private static Object[] findFactors() {
		ArrayList<Integer> factors = new ArrayList<Integer>();
		
		if (number == 0) {
			factors.add(0);
			return factors.toArray();
		}
		
		if (number < 0) {
			number = -number;
			factors.add(-1);
		}
		
		factors.add(1);
		for (int i=2; i<=number; i++) {
			if (number%i == 0) {
				factors.add(i);
			}
		}
		
		return factors.toArray();
	}
}
