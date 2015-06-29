class Demo {
  private static Vehicle myVehicle;

  public static void main(String[] args) {
    myVehicle = new Car();
    myVehicle.go();
    myVehicle = new Motorcycle();
    myVehicle.go();
  }
}
